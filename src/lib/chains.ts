import { defineChain, type Chain } from "viem";

export type ExtendedChain = Chain & {
  iconUrl?: string;
  iconBackground?: string;
};

export const base = defineChain({
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_BASE_RPC!],
    },
  },
  blockExplorers: {
    default: {
      name: "Base Scan",
      url: "https://basescan.org",
    },
  },
  testnet: false,
  iconBackground: "#ffff",
  iconUrl: "/chain/base-logo.png",
});

export const arbitrum = defineChain({
  id: 42161,
  name: "Arbitrum",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://arb1.arbitrum.io/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "Ether Scan",
      url: "https://arbiscan.io",
    },
  },
  testnet: false,
  iconBackground: "#ffff",
  iconUrl: "/chain/arbitrum.png",
});
