import { Chain } from "@/types";

export const chains: Chain[] = [
  {
    id: 8453,
    destinationEndpoint: 30184,
    name: "Base",
    logo: "/chain/base.png",
    contracts: {
      lendingPool: "",
      factory: "0x42C5dFc5899160e9c4e2E139AfFe7472dDf4D86E",
      position: "",
      blockExplorer: "https://basescan.org",
    },
  },
  {
    id: 10,
    destinationEndpoint: 30111,
    name: "Optimism",
    logo: "/chain/optimism-logo.svg",
    contracts: {
      lendingPool: "",
      factory: "",
      position: "",
      blockExplorer: "https://optimism.etherscan.io",
    },
  },
];
