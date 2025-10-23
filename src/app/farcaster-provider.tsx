"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

interface FarcasterProviderProps {
  children: React.ReactNode;
}

export default function FarcasterProvider({ children }: FarcasterProviderProps) {
  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        await sdk.actions.ready();
        console.log("Farcaster SDK initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Farcaster SDK:", error);
      }
    };

    initializeFarcaster();
  }, []);

  return <>{children}</>;
}