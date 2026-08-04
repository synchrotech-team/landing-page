import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const path = typeof body.path === 'string' ? body.path.slice(0, 200) : '/';
    const visitorId = typeof body.visitorId === 'string' ? body.visitorId.slice(0, 100) : 'anonymous';

    // Record real pageview using raw query for maximum compatibility
    await prisma.$executeRawUnsafe(
      `INSERT INTO "page_views" ("path", "visitor_id", "created_at") VALUES ($1, $2, NOW())`,
      path,
      visitorId
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    // ponytail: fail silently so analytics tracking never disrupts user experience
    console.error('Track API error:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
