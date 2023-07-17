'use client';

import './globals.css'
import {WagmiConfig} from "wagmi";
import {wagmiConfig} from "@components/configs/wagmi";
import localFont from '@next/font/local'
import {Dynamic} from "@components/components/no-ssr";

const rowline = localFont({
  src: [
    {
      path: '../../public/fonts/rawline-400.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/rawline-500.ttf',
      weight: '500'
    },
    {
      path: '../../public/fonts/rawline-600.ttf',
      weight: '600'
    }
  ],
  variable: '--font-rowline'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${rowline.variable} font-sans`}>
      <body>
        <WagmiConfig config={wagmiConfig as any}>
          <Dynamic>
            {children}
          </Dynamic>
        </WagmiConfig>
      </body>
    </html>
  )
}
