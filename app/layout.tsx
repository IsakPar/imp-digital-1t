import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import SmoothScroll from "@/components/smooth-scroll"
import TransitionProvider from "@/components/transition-provider"
import PageTransition from "@/components/page-transition"
import { NavigationEvents } from "@/components/navigation-events"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "IMP Digital Services - Premium Digital Solutions",
  description:
    "End-to-end digital services that blend form, function, and future-ready tech. Web development, AI/automation, UI/UX, and cybersecurity.",
  openGraph: {
    title: "IMP Digital Services",
    description: "Build smarter. Move faster. Look better.",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" }, // Modern iOS supports SVG for apple-touch-icon
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <TransitionProvider>
            <SmoothScroll>
              <Navigation />
              <NavigationEvents />
              <main className="min-h-screen">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
            </SmoothScroll>
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
