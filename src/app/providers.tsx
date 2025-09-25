"use client";
import { ReactNode } from "react";
import { base } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import "@coinbase/onchainkit/styles.css";
import FarcasterProvider from "@/components/providers/farcaster-provider";

export function Providers({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: unknown;
}) {
  return (
    <FarcasterProvider>
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={base}
        config={{
          appearance: {
            mode: "light",
          },
          wallet: {
            display: "modal",
            preference: "all",
          },
        }}
      >
        {children}
      </OnchainKitProvider>
    </FarcasterProvider>
  );
}
