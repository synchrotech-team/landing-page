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
    if (cachedData) {
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

        return {
          id: p.id,
          slug: p.slug,
          name: p.name,
          subtitle: p.subtitle || '',
          badge: p.badge || '',
          badgeType: p.badgeType as any || 'purple',
          category: p.category,
          price: p.price,
          stockStatus: p.stockStatus || 'Ready Stock',
          description: p.description || '',
          longDescription: p.longDescription || '',
          keySpecs: keySpecs.length > 0 ? keySpecs : [p.subtitle || p.name],
          features: features.length > 0 ? features : [],
          specifications: specs.length > 0 ? specs : [],
          inTheBox: inTheBox.length > 0 ? inTheBox : [],
          mockupType: p.mockupType as any || 'joulemeter',
          image: p.image,
          en: {
            subtitle: p.subtitleEn || p.subtitle || '',
            badge: p.badgeEn || p.badge || '',
            stockStatus: p.stockStatusEn || p.stockStatus || 'In Stock',
            description: p.descriptionEn || p.description || '',
            longDescription: p.longDescriptionEn || p.longDescription || '',
            keySpecs: keySpecsEn.length > 0 ? keySpecsEn : keySpecs,
            features: featuresEn.length > 0 ? featuresEn : features,
            specifications: specs,
            inTheBox: inTheBoxEn.length > 0 ? inTheBoxEn : inTheBox,
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
