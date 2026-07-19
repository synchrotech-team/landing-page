import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { prisma } from '../../../../lib/db';
import { generateLicenseKey } from '../../../../lib/license-helper';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const licenses = await prisma.license.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        devices: true,
      },
    });

    return NextResponse.json({ success: true, licenses });
  } catch (error) {
    console.error('Admin Licenses GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { customerId, expiryOption, maxDevices, notes, customExpiryDate } = body;

    if (!customerId || !expiryOption) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Map expiry option to actual Date
    let expiryDate = new Date();
    const now = new Date();
    
    switch (expiryOption) {
      case '1m':
        expiryDate.setMonth(now.getMonth() + 1);
        break;
      case '3m':
        expiryDate.setMonth(now.getMonth() + 3);
        break;
      case '6m':
        expiryDate.setMonth(now.getMonth() + 6);
        break;
      case '1y':
        expiryDate.setFullYear(now.getFullYear() + 1);
        break;
      case 'permanent':
        expiryDate = new Date('9999-12-31T00:00:00Z');
        break;
      case 'custom':
        if (!customExpiryDate) {
          return NextResponse.json({ error: 'Custom expiry date is required' }, { status: 400 });
        }
        expiryDate = new Date(customExpiryDate);
        break;
      default:
        return NextResponse.json({ error: 'Invalid expiry option' }, { status: 400 });
    }

    const licenseKey = generateLicenseKey();

    const license = await prisma.license.create({
      data: {
        customerId: Number(customerId),
        licenseKey,
        status: 'INACTIVE', // Starts as INACTIVE until first activation (PRD Sec. 8 & 14)
        expiryDate,
        maxDevices: Number(maxDevices) || 1,
      },
      include: {
        customer: true,
      },
    });

    return NextResponse.json({ success: true, license });
  } catch (error) {
    console.error('Admin Licenses POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, action } = body;

    if (!id || !action) {
      return NextResponse.json({ error: 'Missing parameter id or action' }, { status: 400 });
    }

    const licenseId = Number(id);

    if (action === 'reset') {
      // PRD reset device: "menghapus seluruh device yang terhubung"
      await prisma.device.deleteMany({
        where: { licenseId },
      });
      // Optionally update status back to INACTIVE if no devices are registered
      await prisma.license.update({
        where: { id: licenseId },
        data: { status: 'INACTIVE' },
      });
      return NextResponse.json({ success: true, message: 'All associated devices reset' });
    } 
    
    if (action === 'suspend') {
      // PRD suspend: status berubah menjadi Revoked (REVOKED)
      await prisma.license.update({
        where: { id: licenseId },
        data: { status: 'REVOKED' },
      });
      return NextResponse.json({ success: true, message: 'License suspended' });
    }

    if (action === 'unsuspend') {
      // Unsuspend: status berubah menjadi ACTIVE atau INACTIVE depending on active devices
      const lic = await prisma.license.findUnique({
        where: { id: licenseId },
        include: { devices: true },
      });
      const newStatus = lic && lic.devices.length > 0 ? 'ACTIVE' : 'INACTIVE';
      await prisma.license.update({
        where: { id: licenseId },
        data: { status: newStatus },
      });
      return NextResponse.json({ success: true, message: 'License unsuspended' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Admin Licenses PUT Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = req.nextUrl.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing license ID' }, { status: 400 });
    }

    await prisma.license.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin Licenses DELETE Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
