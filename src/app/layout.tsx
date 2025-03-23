import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import Navigation from "@/components/Navigation/Navigation";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codein",
  description: "Codein blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
      </body>
      {/* <Footer /> */}
    </html>
  );
}
