import { defineChain, type Chain } from "viem";

// Extended chain type with custom properties
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
      http: ["https://mainnet.base.org/"],
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

export const optimism = defineChain({
  id: 10,
  name: "Optimism",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "https://mainnet.optimism.io",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Ether Scan",
      url: "https://optimistic.etherscan.io",
    },
  },
  testnet: false,
  iconBackground: "#ffff",
  iconUrl: "/chain/optimism-logo.svg",
});
