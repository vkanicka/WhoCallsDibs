import type { Metadata } from "next";
import "./globals.css";
import Header from "@components/header";
// import Footer from "@/components/footer";
// import Subnav from "@components/subnav"
import Bubble from "@components/bubble"
import UserContextProvider from '@data/context/user'

import { Cabin } from 'next/font/google'
const cabin = Cabin({
  subsets: ['latin'],
  display: 'swap',
})
 

export const metadata: Metadata = {
  title: "Who calls dibs?",
  description: "A virtual space to post and call dibs on previously owned items",
   icons: {
    apple: ['/dibs-logo.png'],
 },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html className={`${cabin.className} h-screen`} lang="en">
      <UserContextProvider>
        <body className='bg-fixed bg-gradient-to-b from-ikigai-600 to-ikigai-200 min-h-screen w-screen min-w-[375px] overflow-x-hidden'>
          {/* <div className="sticky top-0 right-0 left-0 space-y-2"> */}
            <Header />
            {/* <Subnav /> */}
          {/* </div> */}
          <div className="h-full flex flex-col p-2 px-6">
            {children}
          </div>
          <Bubble />
          {/* <Footer /> */}
        </body>
      </UserContextProvider>
    </html>
  );
}
