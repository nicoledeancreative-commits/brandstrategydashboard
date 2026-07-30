import type { Metadata } from "next";
import { Manrope, Libre_Caslon_Display } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const libreCaslonDisplay = Libre_Caslon_Display({
  variable: "--font-libre-caslon-display",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Brand Strategy Dashboard",
  description: "Brand strategy intake and live preview dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${libreCaslonDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
