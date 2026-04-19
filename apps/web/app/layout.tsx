import React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Launchoria | AI Client Acquisition for Accounting Firms",
  description: "Add $50K-$100K in Annual Revenue on autopilot with our AI-driven client acquisition system for accounting firms.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactNode {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, inter.variable, "font-sans")}
    >
      <body className="bg-zinc-950 text-zinc-400">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
