import type { Metadata } from "next";
import "./globals.css";
import Header from "@components/header";
// import Footer from "@/components/footer";
import Subnav from "@components/subnav"
import UserContextProvider from '@data/context/user'

import { Cabin } from 'next/font/google'
const cabin = Cabin({
  subsets: ['latin'],
  display: 'swap',
})
 

export const metadata: Metadata = {
  title: "Who calls dibs?",
  description: "A virtual space to post and call dibs on previously owned items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html className={`${cabin.className} h-screen`} lang="en">
      <UserContextProvider>
        <body className='min-h-screen w-screen min-w-[375px] overflow-x-hidden bg-green-950'>
          <div className="sticky top-0 right-0 left-0">
            <Header />
            <Subnav />
          </div>
          <div className="bg-green-800 h-full flex flex-col p-2">
            {children}
          </div>
          {/* <Footer /> */}
        </body>
      </UserContextProvider>
    </html>
  );
}
