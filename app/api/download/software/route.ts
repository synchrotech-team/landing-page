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

        // Public Vercel Blob URLs are stored as their native downloadUrl
        // (?download=1, served with Content-Disposition: attachment straight
        // from the CDN edge) — redirect instead of proxying bytes through
        // this function. Local /downloads/* fallback paths redirect the same way.
        const isAbsolute = fileUrl.startsWith('http://') || fileUrl.startsWith('https://');
        return NextResponse.redirect(isAbsolute ? fileUrl : new URL(fileUrl, req.url));
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
