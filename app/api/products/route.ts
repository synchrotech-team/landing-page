import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { PRODUCTS_DATA } from '../../../lib/products';
import { Cache } from '../../../lib/cache';

const CACHE_KEY = 'public_products_list';
const CACHE_TTL_SECONDS = 60; // 1 minute in-memory TTL

export async function GET(req: NextRequest) {
  try {
    // 1. Check in-memory RAM cache first
    const cachedData = Cache.get<any[]>(CACHE_KEY);
    if (cachedData && cachedData.length > 0 && cachedData.every(p => Array.isArray(p.features) && p.features.length > 0)) {
      return NextResponse.json(
        { success: true, products: cachedData, cached: true },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            'X-Cache-Status': 'HIT',
          },
        }
      );
    }

    // 2. Fetch from Database if RAM cache missed
    const dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'asc' },
    });

    let formatted: any[] = [];

    if (dbProducts.length > 0) {
      formatted = dbProducts.map(p => {
        const fallback = PRODUCTS_DATA[p.slug];

        let keySpecs: string[] = [];
        let keySpecsEn: string[] = [];
        let specs: any[] = [];
        let features: any[] = [];
        let featuresEn: any[] = [];
        let inTheBox: string[] = [];
        let inTheBoxEn: string[] = [];

        try { keySpecs = p.keySpecsJson ? JSON.parse(p.keySpecsJson) : []; } catch (e) {}
        try { keySpecsEn = p.keySpecsJsonEn ? JSON.parse(p.keySpecsJsonEn) : keySpecs; } catch (e) {}
        try { specs = p.specsJson ? JSON.parse(p.specsJson) : []; } catch (e) {}
        try { features = p.featuresJson ? JSON.parse(p.featuresJson) : []; } catch (e) {}
        try { featuresEn = p.featuresJsonEn ? JSON.parse(p.featuresJsonEn) : features; } catch (e) {}
        try { inTheBox = p.inTheBoxJson ? JSON.parse(p.inTheBoxJson) : []; } catch (e) {}
        try { inTheBoxEn = p.inTheBoxJsonEn ? JSON.parse(p.inTheBoxJsonEn) : inTheBox; } catch (e) {}

        const finalKeySpecs = keySpecs.length > 0 ? keySpecs : (fallback?.keySpecs || [p.subtitle || p.name]);
        const finalKeySpecsEn = keySpecsEn.length > 0 ? keySpecsEn : (fallback?.en?.keySpecs || finalKeySpecs);

        const finalFeatures = features.length > 0 ? features : (fallback?.features || []);
        const finalFeaturesEn = featuresEn.length > 0 ? featuresEn : (fallback?.en?.features || finalFeatures);

        const finalSpecs = specs.length > 0 ? specs : (fallback?.specifications || []);
        const finalSpecsEn = fallback?.en?.specifications || finalSpecs;

        const finalInTheBox = inTheBox.length > 0 ? inTheBox : (fallback?.inTheBox || []);
        const finalInTheBoxEn = inTheBoxEn.length > 0 ? inTheBoxEn : (fallback?.en?.inTheBox || finalInTheBox);

        return {
          id: p.id,
          slug: p.slug,
          name: p.name,
          subtitle: p.subtitle || fallback?.subtitle || '',
          badge: p.badge || fallback?.badge || '',
          badgeType: p.badgeType as any || fallback?.badgeType || 'purple',
          category: p.category || fallback?.category || '',
          price: p.price || fallback?.price || '',
          stockStatus: p.stockStatus || fallback?.stockStatus || 'Ready Stock',
          description: p.description || fallback?.description || '',
          longDescription: p.longDescription || fallback?.longDescription || '',
          keySpecs: finalKeySpecs,
          features: finalFeatures,
          specifications: finalSpecs,
          inTheBox: finalInTheBox,
          mockupType: p.mockupType as any || fallback?.mockupType || 'joulemeter',
          image: p.image || fallback?.image || '',
          en: {
            subtitle: p.subtitleEn || p.subtitle || fallback?.en?.subtitle || '',
            badge: p.badgeEn || p.badge || fallback?.en?.badge || '',
            stockStatus: p.stockStatusEn || p.stockStatus || fallback?.en?.stockStatus || 'In Stock',
            description: p.descriptionEn || p.description || fallback?.en?.description || '',
            longDescription: p.longDescriptionEn || p.longDescription || fallback?.en?.longDescription || '',
            keySpecs: finalKeySpecsEn,
            features: finalFeaturesEn,
            specifications: finalSpecsEn,
            inTheBox: finalInTheBoxEn,
          }
        };
      });
    } else {
      formatted = Object.values(PRODUCTS_DATA);
    }

    // Store formatted result into RAM Cache
    Cache.set(CACHE_KEY, formatted, CACHE_TTL_SECONDS);

    return NextResponse.json(
      { success: true, products: formatted, cached: false },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'X-Cache-Status': 'MISS',
        },
      }
    );
  } catch (error) {
    console.error('Public Products GET Error:', error);
    return NextResponse.json({ success: true, products: Object.values(PRODUCTS_DATA) });
  }
}
