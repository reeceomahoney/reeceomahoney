import "@/styles/globals.css";
import "katex/dist/katex.min.css";

import { Analytics } from "@vercel/analytics/next";
import { Lato } from "next/font/google";
import { type Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Reece O'Mahoney",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={lato.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col items-center font-sans leading-relaxed">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="w-full max-w-[760px] px-4 pb-16">{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
