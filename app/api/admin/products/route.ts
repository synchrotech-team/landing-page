import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { prisma } from '../../../../lib/db';
import { PRODUCTS_DATA } from '../../../../lib/products';
import { Cache } from '../../../../lib/cache';

let isSeededChecked = false;

// Seed initial default products if DB has 0 items (executed at most once per process run)
async function seedDefaultProducts() {
  if (isSeededChecked) return;
  try {
    const count = await prisma.product.count();
    if (count === 0) {
      for (const prodKey of Object.keys(PRODUCTS_DATA)) {
        const prod = PRODUCTS_DATA[prodKey];
        await prisma.product.create({
          data: {
            slug: prod.slug,
            name: prod.name,
            subtitle: prod.subtitle,
            subtitleEn: prod.en?.subtitle || prod.subtitle,
            badge: prod.badge,
            badgeEn: prod.en?.badge || prod.badge,
            badgeType: prod.badgeType,
            category: prod.category,
            price: prod.price,
            stockStatus: prod.stockStatus,
            stockStatusEn: prod.en?.stockStatus || prod.stockStatus,
            description: prod.description,
            descriptionEn: prod.en?.description || prod.description,
            longDescription: prod.longDescription,
            longDescriptionEn: prod.en?.longDescription || prod.longDescription,
            image: prod.image,
            mockupType: prod.mockupType,
            keySpecsJson: JSON.stringify(prod.keySpecs),
            keySpecsJsonEn: JSON.stringify(prod.en?.keySpecs || prod.keySpecs),
            specsJson: JSON.stringify(prod.specifications),
            featuresJson: JSON.stringify(prod.features),
            featuresJsonEn: JSON.stringify(prod.en?.features || prod.features),
            inTheBoxJson: JSON.stringify(prod.inTheBox),
            inTheBoxJsonEn: JSON.stringify(prod.en?.inTheBox || prod.inTheBox),
          },
        });
      }
    }
    isSeededChecked = true;
  } catch (err) {
    console.error('Seed Default Products Error:', err);
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await seedDefaultProducts();

    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error('Admin Products GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { 
      name, 
      slug, 
      subtitle, 
      subtitleEn, 
      badge, 
      badgeEn, 
      badgeType, 
      category, 
      price, 
      stockStatus, 
      stockStatusEn, 
      description, 
      descriptionEn, 
      longDescription, 
      longDescriptionEn, 
      image, 
      mockupType, 
      keySpecs, 
      keySpecsEn, 
      specifications, 
      features, 
      featuresEn, 
      inTheBox, 
      inTheBoxEn 
    } = body;

    if (!name || !price) {
      return NextResponse.json({ error: 'Name and Price are required' }, { status: 400 });
    }

    const generatedSlug = slug ? slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') : name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

    const product = await prisma.product.create({
      data: {
        name,
        slug: generatedSlug,
        subtitle: subtitle || '',
        subtitleEn: subtitleEn || subtitle || '',
        badge: badge || 'Produk',
        badgeEn: badgeEn || badge || 'Product',
        badgeType: badgeType || 'purple',
        category: category || 'General Hardware',
        price,
        stockStatus: stockStatus || 'Ready Stock',
        stockStatusEn: stockStatusEn || stockStatus || 'In Stock',
        description: description || '',
        descriptionEn: descriptionEn || description || '',
        longDescription: longDescription || '',
        longDescriptionEn: longDescriptionEn || longDescription || '',
        image: image || '/products/coming-soon.svg',
        mockupType: mockupType || 'joulemeter',
        keySpecsJson: Array.isArray(keySpecs) ? JSON.stringify(keySpecs) : keySpecs || '[]',
        keySpecsJsonEn: Array.isArray(keySpecsEn) ? JSON.stringify(keySpecsEn) : keySpecsEn || '[]',
        specsJson: Array.isArray(specifications) ? JSON.stringify(specifications) : specifications || '[]',
        featuresJson: Array.isArray(features) ? JSON.stringify(features) : features || '[]',
        featuresJsonEn: Array.isArray(featuresEn) ? JSON.stringify(featuresEn) : featuresEn || '[]',
        inTheBoxJson: Array.isArray(inTheBox) ? JSON.stringify(inTheBox) : inTheBox || '[]',
        inTheBoxJsonEn: Array.isArray(inTheBoxEn) ? JSON.stringify(inTheBoxEn) : inTheBoxEn || '[]',
      },
    });

    // Invalidate public products cache instantly
    Cache.invalidate('products');

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Admin Products POST Error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Slug sudah digunakan, silakan gunakan slug/nama yang lain.' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { 
      id, 
      name, 
      slug, 
      subtitle, 
      subtitleEn, 
      badge, 
      badgeEn, 
      badgeType, 
      category, 
      price, 
      stockStatus, 
      stockStatusEn, 
      description, 
      descriptionEn, 
      longDescription, 
      longDescriptionEn, 
      image, 
      mockupType, 
      keySpecs, 
      keySpecsEn, 
      specifications, 
      features, 
      featuresEn, 
      inTheBox, 
      inTheBoxEn 
    } = body;

    if (!id || !name) {
      return NextResponse.json({ error: 'Missing product ID or Name' }, { status: 400 });
    }

    const updatedSlug = slug ? slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-') : name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        slug: updatedSlug,
        subtitle: subtitle || '',
        subtitleEn: subtitleEn || subtitle || '',
        badge: badge || 'Produk',
        badgeEn: badgeEn || badge || 'Product',
        badgeType: badgeType || 'purple',
        category: category || 'General Hardware',
        price,
        stockStatus: stockStatus || 'Ready Stock',
        stockStatusEn: stockStatusEn || stockStatus || 'In Stock',
        description: description || '',
        descriptionEn: descriptionEn || description || '',
        longDescription: longDescription || '',
        longDescriptionEn: longDescriptionEn || longDescription || '',
        image: image || '/products/coming-soon.svg',
        mockupType: mockupType || 'joulemeter',
        keySpecsJson: Array.isArray(keySpecs) ? JSON.stringify(keySpecs) : keySpecs || '[]',
        keySpecsJsonEn: Array.isArray(keySpecsEn) ? JSON.stringify(keySpecsEn) : keySpecsEn || '[]',
        specsJson: Array.isArray(specifications) ? JSON.stringify(specifications) : specifications || '[]',
        featuresJson: Array.isArray(features) ? JSON.stringify(features) : features || '[]',
        featuresJsonEn: Array.isArray(featuresEn) ? JSON.stringify(featuresEn) : featuresEn || '[]',
        inTheBoxJson: Array.isArray(inTheBox) ? JSON.stringify(inTheBox) : inTheBox || '[]',
        inTheBoxJsonEn: Array.isArray(inTheBoxEn) ? JSON.stringify(inTheBoxEn) : inTheBoxEn || '[]',
      },
    });

    // Invalidate public products cache instantly
    Cache.invalidate('products');

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Admin Products PUT Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing product ID' }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    // Invalidate public products cache instantly
    Cache.invalidate('products');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin Products DELETE Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
