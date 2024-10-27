import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
   async function middleware(req) {
      const token = await getToken({ req });
      const isAuth = !!token;
      const currentPage = req.nextUrl.pathname;
      const isAuthPage = currentPage.startsWith('/login') || currentPage.startsWith('/register');

      if (isAuthPage) {
         if (isAuth) {
            return NextResponse.redirect(new URL('/mypage', req.url));
         } else {
            return null;
         }
      }

      if (!isAuth) {
         return NextResponse.redirect(new URL('/login', req.url));
      }
   },
   {
      callbacks: {
         async authorized() {
            return true;
         },
      },
   }
);

export const config = {
   matcher: ['/login', '/register', '/mypage'],
};
