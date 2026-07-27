import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { put } from '@vercel/blob';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

function extractVersionFromFileName(name: string): string {
  const match = name.match(/v?(\d+\.\d+(?:\.\d+)?)/i);
  if (match) {
    const ver = match[1];
    return ver.toLowerCase().startsWith('v') ? ver : `v${ver}`;
  }
  return 'v1.0.0';
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No installer file uploaded' }, { status: 400 });
    }

    const originalName = file.name || 'SynchroTech_Setup.exe';
    const extension = path.extname(originalName) || '.exe';
    const safeBaseName = path.basename(originalName, extension).toLowerCase().replace(/[^a-z0-9]/g, '_');
    const fileName = `${safeBaseName}_${Date.now()}${extension}`;

    // Format human-readable file size (e.g., 42.5 MB)
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    const fileSizeStr = `${sizeInMB} MB`;
    const extractedVersion = extractVersionFromFileName(originalName);

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

    // Option 1: Upload directly to Vercel Blob Cloud Storage (Public or Private Access)
    if (blobToken) {
      try {
        let blob;
        try {
          blob = await put(`software/${fileName}`, file, {
            access: 'public',
            token: blobToken,
          });
        } catch (accessErr: any) {
          if (accessErr.message?.includes('private access') || accessErr.message?.includes('private store')) {
            blob = await put(`software/${fileName}`, file, {
              access: 'private',
              token: blobToken,
            });
          } else {
            throw accessErr;
          }
        }

        return NextResponse.json({
          success: true,
          fileUrl: blob.url,
          fileName: originalName,
          fileSize: fileSizeStr,
          extractedVersion,
          storage: 'vercel-blob',
        });
      } catch (blobErr) {
        console.warn('Vercel Blob software upload warning, falling back to local disk:', blobErr);
      }
    }

    // Option 2: Fallback to Local Disk Storage (public/downloads/)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'downloads');
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/downloads/${fileName}`;

    return NextResponse.json({
      success: true,
      fileUrl: publicUrl,
      fileName: originalName,
      fileSize: fileSizeStr,
      extractedVersion,
      storage: 'local-filesystem',
    });
  } catch (error: any) {
    console.error('Software File Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload installer file' }, { status: 500 });
  }
}
