import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';
import { verifyLicenseToken } from '../../../../../lib/crypto-helper';

export async function POST(req: NextRequest) {
  try {
    // 1. Verify API Key
    const apiKey = req.headers.get('X-API-Key');
    const expectedKey = process.env.DESKTOP_API_SECRET || 'default-desktop-api-secret-key';
    
    if (!apiKey || apiKey !== expectedKey) {
      return NextResponse.json(
        { success: false, error: 'INVALID_API_KEY' },
        { status: 401 }
      );
    }

    // 2. Parse request body
    const body = await req.json();
    const { licenseKey, deviceId, token } = body;

    if (!licenseKey || !deviceId || !token) {
      return NextResponse.json(
        { success: false, error: 'BAD_REQUEST', message: 'Missing parameters' },
        { status: 400 }
      );
    }

    // 3. Verify license token signature & contents
    const decoded = verifyLicenseToken(token);
    if (!decoded || decoded.licenseKey !== licenseKey || decoded.deviceId !== deviceId) {
      return NextResponse.json(
        { success: false, error: 'INVALID_TOKEN' },
        { status: 401 }
      );
    }

    // 4. Find license and associated devices in DB
    const license = await prisma.license.findUnique({
      where: { licenseKey },
      include: { devices: true },
    });

    if (!license) {
      return NextResponse.json(
        { success: false, error: 'LICENSE_NOT_FOUND' },
        { status: 404 }
      );
    }

    if (license.status === 'REVOKED') {
      return NextResponse.json(
        { success: false, error: 'LICENSE_REVOKED' },
        { status: 403 }
      );
    }

    if (license.expiryDate && new Date(license.expiryDate) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'LICENSE_EXPIRED' },
        { status: 400 }
      );
    }

    // 5. Verify if this device is still registered (not reset by admin)
    const device = license.devices.find(d => d.deviceId === deviceId);
    if (!device) {
      return NextResponse.json(
        { success: false, error: 'DEVICE_NOT_REGISTERED' },
        { status: 401 }
      );
    }

    // 6. Update last validation time
    await prisma.device.update({
      where: { id: device.id },
      data: { lastValidation: new Date() },
    });

    const nextValidation = new Date();
    nextValidation.setDate(nextValidation.getDate() + 30);

    return NextResponse.json({
      success: true,
      nextValidation: nextValidation.toISOString(),
    });
  } catch (error) {
    console.error('Validation API Error:', error);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}
