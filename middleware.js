import { NextResponse } from 'next/server';
import { cookies } from "next/headers"
import { jwtVerify } from 'jose';


export async function middleware(request) {

  
  const url = request.nextUrl.clone();
  if(url.pathname === '/dashboard') {
    return NextResponse.next();
  }

  const cookieStore = cookies();
  const jwtToken = cookieStore.get('jwt_token')?.value;

  if(url.pathname.includes('/api/')) {
    return NextResponse.next();
  }

  if(!jwtToken && url.pathname !== '/login') {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  } 

  try {
      console.log('---------- PATH NAME ----- ' , url.pathname)
      const { payload } = await jwtVerify(jwtToken, new TextEncoder().encode(process.env.JWT_SECRET));
      if(payload && url.pathname !== '/main') {
          url.pathname = '/main';
          return NextResponse.redirect(url);
      } else {
        return NextResponse.next();
      }
  } catch (error) {
    if(url.pathname !== '/login') {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};