
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  
  cookieStore.set('allowed-domain', 'https://upm.cns365.ir', {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict',
    path: '/',  
  });

  return new Response('Cookie set successfully');
}
