import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { optimism, base } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "Senja Labs",
  projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!,
  chains: [base, optimism],
  ssr: true,
});

export default config;
