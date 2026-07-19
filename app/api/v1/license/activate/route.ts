import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';
import { generateLicenseToken } from '../../../../../lib/crypto-helper';

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
    const { licenseKey, deviceId, deviceName, windowsUsername } = body;

    if (!licenseKey || !deviceId || !deviceName || !windowsUsername) {
      return NextResponse.json(
        { success: false, error: 'BAD_REQUEST', message: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // 3. Find license
    const license = await prisma.license.findUnique({
      where: { licenseKey },
      include: { 
        customer: true,
        devices: true 
      },
    });

    if (!license) {
      return NextResponse.json(
        { success: false, error: 'LICENSE_NOT_FOUND' },
        { status: 404 }
      );
    }

    // 4. Validate license rules
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

    // 5. Manage device list
    let device = license.devices.find(d => d.deviceId === deviceId);

    if (!device) {
      if (license.devices.length >= license.maxDevices) {
        return NextResponse.json(
          { success: false, error: 'MAX_DEVICE_REACHED' },
          { status: 409 }
        );
      }

      // Add device to DB
      device = await prisma.device.create({
        data: {
          licenseId: license.id,
          deviceId,
          deviceName,
          windowsUsername,
          activatedAt: new Date(),
          lastValidation: new Date(),
        },
      });

      // Update license status to ACTIVE if it was INACTIVE
      if (license.status === 'INACTIVE') {
        await prisma.license.update({
          where: { id: license.id },
          data: { status: 'ACTIVE' },
        });
      }
    } else {
      // Device already registered, update its last validation time
      device = await prisma.device.update({
        where: { id: device.id },
        data: { lastValidation: new Date() },
      });
    }

    // 6. Generate signed token
    const nextValidation = new Date();
    nextValidation.setDate(nextValidation.getDate() + 30); // 30 days validation interval

    const token = generateLicenseToken({
      licenseKey: license.licenseKey,
      deviceId,
      expiryDate: license.expiryDate.toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'License activated',
      license: {
        key: license.licenseKey,
        customer: license.customer.teamName,
        maxDevices: license.maxDevices,
        expiredAt: license.expiryDate.toISOString(),
        nextValidation: nextValidation.toISOString(),
      },
      token,
    });
  } catch (error) {
    console.error('Activation API Error:', error);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}
