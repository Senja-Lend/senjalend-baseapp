import { createConfig, http, cookieStorage, createStorage } from "wagmi";
import { base } from "wagmi/chains";

export function getConfig() {
  return createConfig({
    chains: [base],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [base.id]: http(),
    },
  });
}
