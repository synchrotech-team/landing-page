import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function GET(req: NextRequest) {
  try {
    const action = req.nextUrl.searchParams.get('action');
    const id = req.nextUrl.searchParams.get('id');

    // Direct download trigger for specific software ID or latest active software
    if (action === 'download') {
      let targetRelease = null;
      if (id) {
        targetRelease = await prisma.softwareRelease.findUnique({
          where: { id: Number(id) },
        });
      }

      if (!targetRelease) {
        targetRelease = await prisma.softwareRelease.findFirst({
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
        });
      }

      if (targetRelease) {
        await prisma.softwareRelease.update({
          where: { id: targetRelease.id },
          data: { downloadCount: { increment: 1 } },
        });

        const fileUrl = targetRelease.fileUrl;

        // Secure file stream proxy for Vercel Blob (handles Private Store & Public Store)
        if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
          try {
            const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
            const headers: Record<string, string> = {};
            if (blobToken) {
              headers['Authorization'] = `Bearer ${blobToken}`;
            }

            const response = await fetch(fileUrl, { headers });

            if (response.ok) {
              const resHeaders = new Headers();
              resHeaders.set('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
              resHeaders.set(
                'Content-Disposition',
                `attachment; filename="${targetRelease.fileName || 'SynchroTech_Setup.exe'}"`
              );
              if (response.headers.get('content-length')) {
                resHeaders.set('Content-Length', response.headers.get('content-length')!);
              }

              return new NextResponse(response.body, {
                status: 200,
                headers: resHeaders,
              });
            }
          } catch (fetchErr) {
            console.warn('Vercel Blob stream error, falling back to direct URL redirect:', fetchErr);
          }

          // Fallback direct URL redirect
          return NextResponse.redirect(fileUrl);
        }

        // Local file redirect
        return NextResponse.redirect(new URL(fileUrl, req.url));
      }

      // Default Fallback
      return NextResponse.json({ error: 'Belum ada software installer yang tersedia untuk diunduh' }, { status: 404 });
    }

    // Fetch all software releases for public page listing
    const releases = await prisma.softwareRelease.findMany({
      orderBy: [
        { isActive: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json({
      success: true,
      releases,
    });
  } catch (error) {
    console.error('Public Software Download API Error:', error);
    return NextResponse.json({
      success: true,
      releases: [],
    });
  }
}
