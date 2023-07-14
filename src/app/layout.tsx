'use client';

import './globals.css'
import { Inter } from 'next/font/google'
import {WagmiConfig} from "wagmi";
import {wagmiConfig} from "@components/configs/wagmi";
import {Dynamic} from "@components/components/no-ssr";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <WagmiConfig config={wagmiConfig as any}>
        <Dynamic>
          {children}
        </Dynamic>
      </WagmiConfig>
      </body>
    </html>
  )
}
