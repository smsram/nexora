import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexora | High-Impact Digital Marketing & Web Solutions",
  description:
    "Nexora is a bespoke digital marketing and web solutions platform. We engineer high-performance Next.js web architecture, tactile UI/UX systems, and algorithmic revenue flywheels.",
  keywords: [
    "Digital Marketing",
    "Web Development",
    "Next.js Architecture",
    "UI/UX Design",
    "SEO",
    "Performance Marketing",
    "Nexora",
  ],
  authors: [{ name: "Nexora Creations GROUP" }],
  openGraph: {
    title: "Nexora | High-Impact Digital Marketing & Web Solutions",
    description:
      "Engineering bespoke digital ecosystems, tactile web interfaces, and high-converting marketing funnels.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${plusJakarta.variable}`}
    >
      <body className="antialiased selection:bg-[#00D2FF] selection:text-[#00144A] bg-white dark:bg-[#000B2B] text-[#00144A] dark:text-white transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
