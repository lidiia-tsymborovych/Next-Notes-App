import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'some-super-secret-key';

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    if (!decoded?.userId) return null;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _remove, ...userWithoutPassword } = user;

    return userWithoutPassword;
  } catch (error) {
    console.error('[getCurrentUser]', error);
    return null;
  }
}
