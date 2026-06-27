import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, COMPANY_PHONE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Автомобили в наличии и под заказ в Астане`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Easy Motors — автосалон в Астане. Автомобили в наличии и под заказ. Кредит от 21%, оформление за 1 день. Toyota, Hyundai, Kia, Porsche, Mercedes и др.",
  keywords: [
    "автосалон Астана",
    "купить машину Астана",
    "авто в кредит Казахстан",
    "Easy Motors",
    "автомобили в наличии",
    "Toyota Camry Астана",
    "Hyundai Tucson цена",
    "купить Porsche Астана",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Автомобили в наличии и под заказ в Астане`,
    description:
      "Easy Motors — автосалон в Астане. Широкий выбор автомобилей, кредит от 21%, оформление за 1 день.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Автосалон в Астане`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Автомобили в Астане`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: "", // вставить Google Search Console verification code
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="dark">
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="format-detection" content="telephone=yes" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
