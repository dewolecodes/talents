import "../styles/globals.css";
import type { ReactNode } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/navbar/Footer";
import PreLoader from "../components/PreLoader";
import { CartProvider } from "./context/CartContext";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Talents",
  description: "Talents — Music label website",
  icons: {
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo2.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.className}>
      <head>
        <link rel="icon" href="/logo2.png" />
        <link rel="apple-touch-icon" href="/logo2.png" />
      </head>
      <body className="bg-color3 text-color4 antialiased">
        <PreLoader />
        <CartProvider>
          <Navbar />
          <main className="min-h-screen pt-36 md:pt-36">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
