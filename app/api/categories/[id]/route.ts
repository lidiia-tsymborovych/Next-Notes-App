import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/getCurrentUser';

export async function GET(req: Request, context: unknown) {
  const ctx = context as { params?: Record<string, string | string[]> };

  if (!ctx.params?.id || Array.isArray(ctx.params.id)) {
    return NextResponse.json(
      { error: 'Invalid or missing id' },
      { status: 400 }
    );
  }

  const id = parseInt(ctx.params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  return NextResponse.json(category);
}

export async function DELETE(req: NextRequest, context: unknown) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const ctx = context as { params?: Record<string, string | string[]> };

  if (!ctx.params?.id || Array.isArray(ctx.params.id)) {
    return NextResponse.json(
      { error: 'Invalid or missing id' },
      { status: 400 }
    );
  }

  const id = parseInt(ctx.params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  try {
    const deleted = await prisma.category.deleteMany({
      where: {
        id,
        userId: user.id,
      },
    });

    if (deleted.count === 0) {
      return NextResponse.json(
        { message: 'Category not found or unauthorized' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { message: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
