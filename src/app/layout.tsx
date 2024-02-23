import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
// import Footer from "@/components/footer";
import Subnav from "@/components/subnav"

export const metadata: Metadata = {
  title: "Want this?",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-screen" lang="en">
      <body className='w-screen min-w-[375px] overflow-hidden bg-green-950'>
        <Header />
        <Subnav />
        <div className="bg-green-800 h-full flex flex-col p-2">
          {children}
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
