import type { Metadata } from "next"
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from "next-themes"
import { ThemeToggle } from "@/components/theme-toggle"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Daily Checkin - Track Your Emotional Balance",
  description: "A mindful way to track your emotional balance across key life areas",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Theme toggle in top right corner */}
          <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
            <ThemeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
