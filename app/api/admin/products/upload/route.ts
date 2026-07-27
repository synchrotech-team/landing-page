import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { put } from '@vercel/blob';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const originalName = file.name || 'product.png';
    const extension = path.extname(originalName) || '.png';
    const safeBaseName = path.basename(originalName, extension).toLowerCase().replace(/[^a-z0-9]/g, '-');
    const fileName = `${safeBaseName}-${Date.now()}${extension}`;

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    // Option 1: Use Vercel Blob Cloud Storage (Public or Private Store)
    if (blobToken) {
      try {
        let blob;
        try {
          blob = await put(`products/${fileName}`, file, {
            access: 'public',
            token: blobToken,
          });
        } catch (accessErr: any) {
          if (accessErr.message?.includes('private access') || accessErr.message?.includes('private store')) {
            blob = await put(`products/${fileName}`, file, {
              access: 'private',
              token: blobToken,
            });
          } else {
            throw accessErr;
          }
        }

        return NextResponse.json({
          success: true,
          imageUrl: blob.url,
          fileName,
          storage: 'vercel-blob',
        });
      } catch (blobErr) {
        console.warn('Vercel Blob image upload warning, falling back to local storage:', blobErr);
      }
    }

    // Option 2: Fallback to Local Disk Storage (public/products/)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'products');
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/products/${fileName}`;

    return NextResponse.json({
      success: true,
      imageUrl: publicUrl,
      fileName,
      storage: 'local-filesystem',
    });
  } catch (error: any) {
    console.error('Image Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
