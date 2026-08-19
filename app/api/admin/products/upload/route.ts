import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { put, del } from '@vercel/blob';
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

    // Option 1: Use Vercel Blob Cloud Storage (public — served straight off Vercel's
    // CDN edge, no server-side proxy needed for delivery). Credentials are resolved
    // by the SDK: OIDC (VERCEL_OIDC_TOKEN + BLOB_STORE_ID) on Vercel, or
    // BLOB_READ_WRITE_TOKEN if one is set.
    try {
      const blob = await put(`products/${fileName}`, file, { access: 'public' });

      return NextResponse.json({
        success: true,
        imageUrl: blob.url,
        fileName,
        storage: 'vercel-blob',
      });
    } catch (blobErr) {
      // On Vercel the filesystem is ephemeral, so the local fallback below would
      // report success and then lose the file. Fail loudly instead.
      if (process.env.VERCEL) {
        console.error('Vercel Blob image upload failed:', blobErr);
        return NextResponse.json({ error: (blobErr as Error).message }, { status: 500 });
      }
      console.warn('Vercel Blob image upload warning, falling back to local storage:', blobErr);
    }

    // Option 2: Fallback to Local Disk Storage (public/products/) — local dev only
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

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = req.nextUrl.searchParams.get('url');

    // Only ever delete actual Vercel Blob objects — never touch static/local seed assets.
    if (url && url.includes('.blob.vercel-storage.com/')) {
      await del(url);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Image Delete Error:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
