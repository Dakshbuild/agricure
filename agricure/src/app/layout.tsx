import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingChatbot from "@/components/FloatingChatbot";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CROPLY | AI Powered Smart Farming",
  description: "Detect Crop Diseases Early • Monitor Farm Health • Predict Risks • Save Water • Increase Yield",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <AnimatedBackground />
        <Navbar />
        <main className="flex-grow pt-24 z-10">{children}</main>
        <FloatingChatbot />
      </body>
    </html>
  );
}
