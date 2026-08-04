import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';

// Client-upload flow: the browser PUTs the file straight to Vercel Blob using
// a short-lived token issued here — the file bytes never pass through this
// function, so large installers aren't subject to the server body-size limit
// that was silently truncating them.
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await req.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        addRandomSuffix: false,
        maximumSizeInBytes: 500 * 1024 * 1024,
      }),
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Software upload token error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
