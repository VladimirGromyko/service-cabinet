import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {cookies} from "next/headers";
import StoreProvider from "@/store/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  auth,
  children,
}: Readonly<{
  auth: React.ReactNode;
  children: React.ReactNode;
  // children: React.PropsWithChildren;
}>) {
  // async function getUser() {
  //   const sessionCookie = cookies().get('app_session')?.value
  //   if (sessionCookie === undefined) return null
  //   const res = await fetch(`http://localhost:8000/api/user/me`, {
  //     next: { revalidate: 10 },
  //     headers: {
  //       cookie: `app_session=${sessionCookie}`
  //     }
  //   })
  //   const user = (await res.json()) as User | null
  //   return user
  // }


  return (
      <StoreProvider>
        <html lang="en">
        {/*<body className={inter.className}>{children}</body>*/}
        <body>
        <AntdRegistry>
          {/*<UserProvider user={user}>*/}
          {auth}
          {children}
          {/*</UserProvider>*/}
          {/*{auth}*/}
          {/*{children}*/}
        </AntdRegistry>
        </body>
        </html>
      </StoreProvider>

  );
}
