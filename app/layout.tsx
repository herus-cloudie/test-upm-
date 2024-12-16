import "./globals.css";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'

import { ClerkProvider } from '@clerk/nextjs'

import type { Metadata } from "next";
import { headers } from 'next/headers';
export const metadata: Metadata = {
  title: "Pishgaman UPM",
  description: "video call application by pishgaman",
  icons:{
    icon: "/icons/logo.svg",
  }
};

export default async function RootLayout({children} : {children : React.ReactNode}) {


  const requestHeaders = headers();
  const referer = requestHeaders.get('referer');
  let baseURL = '';
  
  if (referer) {
    try {
      const url = new URL(referer);
      baseURL = `${url.protocol}//${url.host}`; // e.g., https://example.com
    } catch (error) {
      console.error('Invalid Referer URL:', referer);
    }
  }

  return (
    <ClerkProvider appearance={
        {
          layout : {
            logoImageUrl : '/icons/yoom-logo.svg',
            socialButtonsVariant : 'iconButton'
          },
          variables : {
            colorText : '#fff',
            colorPrimary : '#0E78F9',
            colorBackground : '#1C1F2E',
            colorInputBackground : '#252A41',
            colorInputText : '#fff'
          }
      }
    }>   
      <html lang="en" dir="rtl">
          <body className={`bg-dark-2 relative text-white`}>
            {baseURL != 'https://upm.cns365.ir' && 
              <div className="flex justify-center h-screen items-center">
                <p className="text-3xl">شما به این صفحه دسترسی ندارید!</p> 
              </div>
              }
            {baseURL == 'https://upm.cns365.ir' && children}
          </body>
      </html>
    </ClerkProvider>
  )
}

