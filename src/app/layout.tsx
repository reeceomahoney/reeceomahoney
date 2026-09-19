import "@/styles/globals.css";
import "katex/dist/katex.min.css";

import { Analytics } from "@vercel/analytics/next";
import { Geist } from "next/font/google";
import { type Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Reece O'Mahoney",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-slate-100 dark:bg-slate-900 dark:text-slate-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
