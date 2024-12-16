import "./globals.css";
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'

import { ClerkProvider } from '@clerk/nextjs'

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pishgaman UPM",
  description: "video call application by pishgaman",
  icons:{
    icon: "/icons/logo.svg",
  }
};

export default async function RootLayout({children} : {children : React.ReactNode}) {

  const request = await fetch(`https://test-upm.vercel.app/api/isAllowed`)
  const data = await request.json()

 
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
            {request.status == 403 && 
              <div className="flex justify-center h-screen items-center">
                <p className="text-3xl">شما به این صفحه دسترسی ندارید!</p> 
              </div>
            }
            {request.status != 403 && children}
          </body>
      </html>
    </ClerkProvider>
  )
}

