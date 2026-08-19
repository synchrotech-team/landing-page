import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { handleUploadPresigned, type HandleUploadPresignedBody } from '@vercel/blob/client';
import { issueSignedToken } from '@vercel/blob';

const MAX_UPLOAD_BYTES = 500 * 1024 * 1024;

// Client-upload flow: the browser PUTs the file straight to Vercel Blob using
// a short-lived presigned URL issued here — the file bytes never pass through
// this function, so large installers aren't subject to the server body-size
// limit that was silently truncating them.
//
// Presigned (not `handleUpload`) because the Blob store is connected over OIDC:
// there is no BLOB_READ_WRITE_TOKEN to sign client tokens with. `issueSignedToken`
// authenticates with VERCEL_OIDC_TOKEN + BLOB_STORE_ID, both injected by Vercel.
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await req.json()) as HandleUploadPresignedBody;

  try {
    const jsonResponse = await handleUploadPresigned({
      body,
      request: req,
      getSignedToken: async (pathname) => ({
        token: await issueSignedToken({
          pathname,
          operations: ['put'],
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
        }),
        urlOptions: {
          addRandomSuffix: false,
          maximumSizeInBytes: MAX_UPLOAD_BYTES,
        },
      }),
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Software upload token error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
