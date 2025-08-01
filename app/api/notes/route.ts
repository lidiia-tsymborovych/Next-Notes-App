// app/api/notes/route.ts

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'some-super-secret-key';

async function getUserIdFromRequest(req: Request): Promise<number | null> {
  try {
    const cookie = req.headers.get('cookie') || '';
    const tokenCookie = cookie
      .split(';')
      .find(c => c.trim().startsWith('token='));
    if (!tokenCookie) return null;

    const token = tokenCookie.split('=')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    return decoded.userId;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const notes = await prisma.note.findMany();
    return NextResponse.json(notes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error loading notes' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const userId = await getUserIdFromRequest(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { title, content, categoryId } = body;

  if (!title || !content || !categoryId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        categoryId,
        userId,
      },
    });
    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
