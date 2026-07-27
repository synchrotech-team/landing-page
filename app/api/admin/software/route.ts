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

    const releases = await prisma.softwareRelease.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, releases });
  } catch (error) {
    console.error('Admin Software GET Error:', error);
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
    const { 
      title, 
      titleEn, 
      version, 
      releaseNotes, 
      releaseNotesEn, 
      osRequirements, 
      fileUrl, 
      fileName, 
      fileSize, 
      isActive 
    } = body;

    if (!fileUrl) {
      return NextResponse.json({ error: 'File installer harus diunggah' }, { status: 400 });
    }

    if (isActive) {
      await prisma.softwareRelease.updateMany({
        data: { isActive: false },
      });
    }

    const release = await prisma.softwareRelease.create({
      data: {
        title: title || 'SynchroTech Race Telemetry Suite',
        titleEn: titleEn || title || 'SynchroTech Race Telemetry Suite',
        version: version || 'v1.0.0',
        releaseNotes: releaseNotes || '',
        releaseNotesEn: releaseNotesEn || releaseNotes || '',
        osRequirements: osRequirements || 'Windows 10/11 (64-bit)',
        fileUrl,
        fileName: fileName || 'SynchroTech_Setup.exe',
        fileSize: fileSize || '45 MB',
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    return NextResponse.json({ success: true, release });
  } catch (error: any) {
    console.error('Admin Software POST Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { 
      id, 
      title, 
      titleEn, 
      version, 
      releaseNotes, 
      releaseNotesEn, 
      osRequirements, 
      fileUrl, 
      fileName, 
      fileSize, 
      isActive 
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing release ID' }, { status: 400 });
    }

    if (isActive) {
      await prisma.softwareRelease.updateMany({
        where: { id: { not: Number(id) } },
        data: { isActive: false },
      });
    }

    const release = await prisma.softwareRelease.update({
      where: { id: Number(id) },
      data: {
        title,
        titleEn,
        version,
        releaseNotes,
        releaseNotesEn,
        osRequirements,
        fileUrl,
        fileName,
        fileSize,
        isActive,
      },
    });

    return NextResponse.json({ success: true, release });
  } catch (error: any) {
    console.error('Admin Software PUT Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
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
      return NextResponse.json({ error: 'Missing release ID' }, { status: 400 });
    }

    await prisma.softwareRelease.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Admin Software DELETE Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
