import { headers } from "next/headers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import "@coinbase/onchainkit/styles.css";
import { Providers } from "./providers";
import AuroraBackground from "@/components/aurora-ui";
import AppWrapper from "@/components/app-wrapper";
import SenjaHeader from "@/components/header/senja-header";
import { BottomNavigation } from "@/components/navbar";
import { cookieToInitialState } from "wagmi";
import { getConfig } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_URL;
  return {
    title: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
    description: "Crosschain Lending Protocol",
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
        button: {
          title: `Launch ${process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME}`,
          action: {
            type: "launch_frame",
            name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
            url: URL,
            splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE,
            splashBackgroundColor:
              process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
          },
        },
      }),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get("cookie")
  );
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-root antialiased min-h-screen bg-gradient-to-br from-senja-background via-senja-cream/30 to-senja-cream-light/40`}
      >
        <AuroraBackground />
        <AppWrapper>
          <Providers initialState={initialState}>
            <SenjaHeader />
            <div className="pt-20">
              {children}
            </div>
            <div className="mt-6">
              <BottomNavigation />
            </div>
          </Providers>
        </AppWrapper>
      </body>
    </html>
  );
}
