import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { CategoryItem } from '@/app/types/category';

const JWT_SECRET = process.env.JWT_SECRET || 'some-super-secret-key';

function getTokenFromCookie(req: Request): string | null {
  const cookie = req.headers.get('cookie') || '';
  const tokenCookie = cookie
    .split(';')
    .find(c => c.trim().startsWith('token='));

  return tokenCookie ? tokenCookie.split('=')[1] : null;
}

function verifyToken(token: string): { userId: number } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch {
    return null;
  }
}

// GET /api/categories
export async function GET(req: Request) {
  const token = getTokenFromCookie(req);
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const categories = await prisma.category.findMany({
      where: { userId: decoded.userId },
      include: { notes: true },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Fetch categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user categories' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const token = getTokenFromCookie(req);
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (Array.isArray(body.categories)) {
      // Якщо прийшов масив категорій — створюємо batch
      const categoriesToCreate = body.categories.map((cat: CategoryItem) => ({
        title: cat.title,
        iconName: cat.iconName,
        bgColor: cat.bgColor,
        iconColor: cat.iconColor,
        userId: decoded.userId,
      }));

      // createMany не повертає створені записи, тільки count
      await prisma.category.createMany({
        data: categoriesToCreate,
        skipDuplicates: true, // на випадок, якщо дублікати
      });

      return NextResponse.json(
        { message: 'Categories created' },
        { status: 201 }
      );
    } else {
      // Інакше, одна категорія
      const cat = body;
      const newCategory = await prisma.category.create({
        data: {
          title: cat.title,
          iconName: cat.iconName,
          bgColor: cat.bgColor,
          iconColor: cat.iconColor,
          userId: decoded.userId,
        },
      });

      return NextResponse.json(newCategory, { status: 201 });
    }
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

