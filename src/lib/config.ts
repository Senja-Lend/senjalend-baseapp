import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { base, arbitrum } from "./chains";
import { coinbaseWallet, metaMask, walletConnect } from "wagmi/connectors";

export const chains = [base, arbitrum];
const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!;

export const chainData = {
  [base.id]: {
    ...base,
    logo: base.iconUrl,
    displayName: base.name,
    symbol: base.nativeCurrency.symbol,
  },
  [arbitrum.id]: {
    ...arbitrum,
    logo: arbitrum.iconUrl,
    displayName: arbitrum.name,
    symbol: arbitrum.nativeCurrency.symbol,
  },
};

export function getConfig() {
  return createConfig({
    chains: [base, arbitrum],
    ssr: true,
    batch: {
      multicall: true,
    },
    storage: createStorage({
      storage: cookieStorage,
    }),
    connectors: [
      coinbaseWallet({
        appName: "Senja",
        appLogoUrl: "https://senja-labs.vercel.app/senja-logo.png",
        enableMobileWalletLink: true,
        preference: "smartWalletOnly",
      }),
      metaMask(),
      walletConnect({ projectId }),
    ],
    transports: {
      [base.id]: http(base.rpcUrls.default.http[0], {
        batch: true,
        fetchOptions: {
          keepalive: true,
        },
      }),
      [arbitrum.id]: http(arbitrum.rpcUrls.default.http[0], {
        batch: true,
        fetchOptions: {
          keepalive: true,
        },
      }),
    },
  });
}
