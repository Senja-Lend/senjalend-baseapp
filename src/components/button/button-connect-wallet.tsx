"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ButtonConnectWallet = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";

        if (!ready) {
          return (
            <div
              aria-hidden={true}
              className="opacity-0 pointer-events-none select-none"
            />
          );
        }

        if (!account || !chain) {
          return (
            <div className="relative group">
              <button
                onClick={openConnectModal}
                type="button"
                className="flex items-center justify-center space-x-1.5 px-6 py-1.5 rounded-lg bg-[#ff5d06] text-white font-medium transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-full"
              >
                <span>Connect Wallet</span>
              </button>
            </div>
          );
        }

        if (chain.unsupported) {
          return (
            <div className="relative group">
              <button
                onClick={openChainModal}
                type="button"
                className="flex items-center justify-center space-x-2 px-6 py-1.5 rounded-lg bg-[#de2f07] text-destructive-foreground font-medium transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] w-full"
              >
                <span>Wrong Network</span>
              </button>
            </div>
          );
        }
        return (
          <div className="flex items-center gap-3">
            <div className="relative group">
              <button
                onClick={openChainModal}
                type="button"
                className="flex items-center justify-center space-x-1 px-3 py-1.5 rounded-lg bg-[#ff5d06] text-white hover:opacity-90 font-medium transition-all"
              >
                {chain.hasIcon && chain.iconUrl && (
                  <img
                    src={chain.iconUrl || "/placeholder.svg"}
                    alt={chain.name || "Chain icon"}
                    className="w-4 h-4 rounded-full mr-1"
                    style={{ background: chain.iconBackground }}
                  />
                )}
                <span>{chain.name}</span>
              </button>
            </div>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ButtonConnectWallet;
