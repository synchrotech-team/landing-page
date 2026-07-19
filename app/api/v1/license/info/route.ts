import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    // Verify API Key
    const apiKey = req.headers.get('X-API-Key');
    const expectedKey = process.env.DESKTOP_API_SECRET || 'default-desktop-api-secret-key';
    
    if (!apiKey || apiKey !== expectedKey) {
      return NextResponse.json(
        { success: false, error: 'INVALID_API_KEY' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { licenseKey } = body;

    if (!licenseKey) {
      return NextResponse.json(
        { success: false, error: 'BAD_REQUEST', message: 'Missing licenseKey' },
        { status: 400 }
      );
    }

    const license = await prisma.license.findUnique({
      where: { licenseKey },
      include: {
        customer: true,
        devices: true,
      },
    });

    if (!license) {
      return NextResponse.json(
        { success: false, error: 'LICENSE_NOT_FOUND' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      customer: license.customer.teamName,
      status: license.status,
      expiredAt: license.expiryDate.toISOString().split('T')[0],
      maxDevices: license.maxDevices,
      activeDevices: license.devices.length,
    });
  } catch (error) {
    console.error('Info API Error:', error);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}
