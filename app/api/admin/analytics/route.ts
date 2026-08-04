import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

async function safeCountPageViews(start?: Date, end?: Date): Promise<number> {
  try {
    let res: any[];
    if (start && end) {
      res = await prisma.$queryRawUnsafe(
        `SELECT COUNT(*)::int as count FROM "page_views" WHERE "created_at" >= $1 AND "created_at" <= $2`,
        start,
        end
      );
    } else {
      res = await prisma.$queryRawUnsafe(`SELECT COUNT(*)::int as count FROM "page_views"`);
    }
    return Number(res?.[0]?.count || 0);
  } catch (err) {
    return 0;
  }
}

async function safeCountUniqueVisitors(start?: Date, end?: Date): Promise<number> {
  try {
    let res: any[];
    if (start && end) {
      res = await prisma.$queryRawUnsafe(
        `SELECT COUNT(DISTINCT "visitor_id")::int as count FROM "page_views" WHERE "created_at" >= $1 AND "created_at" <= $2`,
        start,
        end
      );
    } else {
      res = await prisma.$queryRawUnsafe(`SELECT COUNT(DISTINCT "visitor_id")::int as count FROM "page_views"`);
    }
    return Number(res?.[0]?.count || 0);
  } catch (err) {
    return 0;
  }
}

export async function GET() {
  try {
    const now = new Date();

    // 1. Fetch total DB metrics
    const [dlAgg, devCount, licCount, totalPageViews, totalUniqueVisitors] = await Promise.all([
      prisma.softwareRelease.aggregate({ _sum: { downloadCount: true } }),
      prisma.device.count(),
      prisma.license.count(),
      safeCountPageViews(),
      safeCountUniqueVisitors(),
    ]);

    const totalSoftwareDownloads = dlAgg._sum.downloadCount || 0;

    // 2. Aggregate 7-Day Timeseries
    const days = ['Ming', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const data7d = [];

    for (let i = 6; i >= 0; i--) {
      const dStart = new Date(now);
      dStart.setDate(now.getDate() - i);
      dStart.setHours(0, 0, 0, 0);

      const dEnd = new Date(dStart);
      dEnd.setHours(23, 59, 59, 999);

      const dayLabel = days[dStart.getDay()];

      const [visits, uniqueRes, telemetrySessions] = await Promise.all([
        safeCountPageViews(dStart, dEnd),
        safeCountUniqueVisitors(dStart, dEnd),
        prisma.device.count({
          where: { activatedAt: { gte: dStart, lte: dEnd } },
        }).catch(() => 0),
      ]);

      data7d.push({
        label: dayLabel,
        visits,
        unique: uniqueRes,
        telemetrySessions,
      });
    }

    // 3. Aggregate 30-Day Timeseries (4 Weeks)
    const data30d = [];
    for (let w = 3; w >= 0; w--) {
      const wStart = new Date(now);
      wStart.setDate(now.getDate() - (w + 1) * 7);
      const wEnd = new Date(now);
      wEnd.setDate(now.getDate() - w * 7);

      const [visits, uniqueRes, telemetrySessions] = await Promise.all([
        safeCountPageViews(wStart, wEnd),
        safeCountUniqueVisitors(wStart, wEnd),
        prisma.device.count({
          where: { activatedAt: { gte: wStart, lte: wEnd } },
        }).catch(() => 0),
      ]);

      data30d.push({
        label: `Minggu ${4 - w}`,
        visits,
        unique: uniqueRes,
        telemetrySessions,
      });
    }

    // 4. Aggregate 12-Month Timeseries
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const data12m = [];
    for (let m = 11; m >= 0; m--) {
      const mStart = new Date(now.getFullYear(), now.getMonth() - m, 1);
      const mEnd = new Date(now.getFullYear(), now.getMonth() - m + 1, 0, 23, 59, 59, 999);

      const [visits, uniqueRes, telemetrySessions] = await Promise.all([
        safeCountPageViews(mStart, mEnd),
        safeCountUniqueVisitors(mStart, mEnd),
        prisma.device.count({
          where: { activatedAt: { gte: mStart, lte: mEnd } },
        }).catch(() => 0),
      ]);

      data12m.push({
        label: months[mStart.getMonth()],
        visits,
        unique: uniqueRes,
        telemetrySessions,
      });
    }

    return NextResponse.json({
      success: true,
      isRealDbAnalytics: true,
      dbMetrics: {
        totalSoftwareDownloads,
        activeTelemetryDevices: devCount,
        totalLicenses: licCount,
        totalPageViews,
        totalUniqueVisitors,
      },
      timeseries: {
        '7d': data7d,
        '30d': data30d,
        '12m': data12m,
      },
    });
  } catch (err: any) {
    console.error('Analytics API error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
