import { NextResponse } from 'next/server';

export async function GET() {
  // Return GSC verification token success response
  return new NextResponse('google-site-verification: google-site-verification-placeholder-hash.html', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
