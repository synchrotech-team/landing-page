import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth';
import { prisma } from '../../../../lib/db';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: 'desc' },
      include: { licenses: true },
    });
    return NextResponse.json({ success: true, customers });
  } catch (error) {
    console.error('Admin Customers GET Error:', error);
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
    const { teamName, email, phone, notes } = body;

    if (!teamName) {
      return NextResponse.json({ error: 'Team Name is required' }, { status: 400 });
    }

    const customer = await prisma.customer.create({
      data: { teamName, email, phone, notes },
    });

    return NextResponse.json({ success: true, customer });
  } catch (error) {
    console.error('Admin Customers POST Error:', error);
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
    const { id, teamName, email, phone, notes } = body;

    if (!id || !teamName) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const customer = await prisma.customer.update({
      where: { id: Number(id) },
      data: { teamName, email, phone, notes },
    });

    return NextResponse.json({ success: true, customer });
  } catch (error) {
    console.error('Admin Customers PUT Error:', error);
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
      return NextResponse.json({ error: 'Missing customer ID' }, { status: 400 });
    }

    await prisma.customer.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin Customers DELETE Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
