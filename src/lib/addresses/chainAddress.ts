import { Chain } from "@/types";

export const chains: Chain[] = [
  {
    id: 8453,
    destinationEndpoint: 30184,
    name: "Base",
    logo: "/chain/base.png",
    contracts: {
      lendingPool: "",
      factory: "0x5a28316959551dA618F84070FfF70B390270185C",
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
