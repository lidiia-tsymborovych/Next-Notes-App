import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const { pathname } = req.nextUrl;

  // Сторінки, які не потребують авторизації:
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/api/auth/login',
    '/api/auth/register',
  ];

  // Якщо юзер іде на публічні сторінки — пропускаємо
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Якщо немає токена і це не публічна сторінка — редірект на /
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Інакше — все норм, пропускаємо
  return NextResponse.next();
}

// Для застосування middleware тільки до певних сторінок (тут всі, крім публічних)
export const config = {
  matcher: [
    /*
      Тут можна уточнити, які шляхи підпадають під перевірку:
      Наприклад, всі, крім "/", "/login", "/register", "/api/auth/..."
    */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
