import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/ToastProvider";

/* Poppins for headings/UI — matches the logo wordmark.
   Inter for body: far easier to read fast at paragraph sizes. */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_DESCRIPTION =
  "A free, AI-supported self-study platform to help family-migrants prepare for the Dutch civic integration exam (inburgering) — structured lessons, adaptive quizzes, vocabulary flashcards and an AI study buddy.";

export const metadata: Metadata = {
  metadataBase: new URL("https://integreernl.vercel.app"),
  title: {
    default: "IntegreerNL — Learn Dutch. For free.",
    template: "%s · IntegreerNL",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "IntegreerNL — Learn Dutch. For free.",
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_NL",
    siteName: "IntegreerNL",
  },
  twitter: {
    card: "summary_large_image",
    title: "IntegreerNL — Learn Dutch. For free.",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-body">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
