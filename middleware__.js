import { NextResponse } from 'next/server';
import { cookies } from "next/headers"
import { jwtVerify } from 'jose';


export async function middleware(request) {

/*
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const cookieStore = cookies();
  const jwtToken = cookieStore.get('jwt_token')?.value;
  const paths = ['/tools', '/', '/login'];

  if (paths.includes(pathname)) {
    
    try {
      const { payload } = await jwtVerify(jwtToken, new TextEncoder().encode(process.env.JWT_SECRET));
      if (!payload?.email) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      if (payload?.email && !pathname.includes('/tools')) {
        return NextResponse.redirect(new URL('/tools', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next(); 
 */

  
  // const url = request.nextUrl.clone();
  // const cookieStore = cookies();
  // const jwtToken = cookieStore.get('jwt_token')?.value;

  // if(url.pathname.includes('/api/')) {
  //   return NextResponse.next();
  // }

  // if(!jwtToken && url.pathname !== '/login') {
  //   url.pathname = '/login';
  //   return NextResponse.redirect(url);
  // } 

  // try {
  //   const { payload } = await jwtVerify(jwtToken, new TextEncoder().encode(process.env.JWT_SECRET));
  //   console.log('---------- PATH NAME ----- ' , url.pathname, ' ---- PAYLOAD ---- ', payload)
  //     if(payload?.email && url.pathname !== '/tools') {
  //         url.pathname = '/tools';
  //         return NextResponse.redirect(url);
  //     } 
      
  //     return NextResponse.next();

  // } catch (error) {
  //   if(url.pathname !== '/login') {
  //     url.pathname = '/login';
  //     return NextResponse.redirect(url);
  //   }
  // }
  // return NextResponse.next();
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', 
    '/tools', '/:path*', '/'
  ],
};