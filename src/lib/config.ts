import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { base, optimism } from "./chains";
import { coinbaseWallet, metaMask, walletConnect } from "wagmi/connectors";

export const chains = [base, optimism];
const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!;

export const chainData = {
  [base.id]: {
    ...base,
    logo: base.iconUrl,
    displayName: base.name,
    symbol: base.nativeCurrency.symbol,
  },
  [optimism.id]: {
    ...optimism,
    logo: optimism.iconUrl,
    displayName: optimism.name,
    symbol: optimism.nativeCurrency.symbol,
  },
};

export function getConfig() {
  return createConfig({
    chains: [base, optimism],
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
      [optimism.id]: http(optimism.rpcUrls.default.http[0], {
        batch: true,
        fetchOptions: {
          keepalive: true,
        },
      }),
    },
  });
}
