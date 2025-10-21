"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useConnect, useAccount } from "wagmi";
import type { Connector } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Wallet as WalletIcon, Loader2 } from "lucide-react";

interface WalletConnectDialogProps {
  className?: string;
  connectButtonText?: string;
  theme?: "default" | "senja" | "blue";
}

// Wallet logo mapping
const walletLogos: Record<string, string> = {
  WalletConnect:"/wallet/walletconnect-logo.png",
  MetaMask: "/wallet/metamask-logo.png",
  "OKX Wallet": "/wallet/okx-logo.avif",
  "Brave Wallet": "/wallet/brave-logo.png",
  "Rabby Wallet": "/wallet/rabby-logo.png",
  Farcaster: "/wallet/farcaster-logo.png",
  "Coinbase Wallet": "/wallet/coinbase.png"
};

export const WalletConnectDialog: React.FC<WalletConnectDialogProps> = ({
  className = "",
  connectButtonText = "Connect to Senja",
  theme = "default",
}) => {
  const { connect, connectors, isPending } = useConnect();
  const { isConnected } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Close dialog when wallet is successfully connected
  useEffect(() => {
    if (isConnected && isOpen) {
      // Small delay to show success state
      setTimeout(() => {
        setIsOpen(false);
        setSelectedWallet(null);
        setIsConnecting(false);
      }, 500);
    }
  }, [isConnected, isOpen]);

  // Reset loading state if connection fails or user cancels
  useEffect(() => {
    if (!isConnecting && selectedWallet) {
      // Reset after 30 seconds if still not connected
      const timeout = setTimeout(() => {
        setSelectedWallet(null);
        setIsConnecting(false);
      }, 30000);

      return () => clearTimeout(timeout);
    }
  }, [isConnecting, selectedWallet]);

  // Handle dialog close - reset all states
  const handleDialogClose = (open: boolean) => {
    if (!open) {
      // Reset all states when dialog is closed
      setSelectedWallet(null);
      setIsConnecting(false);
    }
    setIsOpen(open);
  };

  const getThemeClasses = () => {
    // Force Senja theme for this dialog per design request
    return {
      button: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200",
      dialog: "bg-white/95 backdrop-blur-sm border border-orange-200",
      title: "text-gray-900",
      description: "text-gray-600",
      accent: "text-orange-600",
      listBase: "bg-white/80 backdrop-blur-sm text-gray-900 w-full border border-orange-200",
      listHover: "hover:bg-orange-50 hover:border-orange-300",
      listText: "text-gray-900",
      listHoverText: "hover:text-orange-700",
      listSelected: "bg-orange-100 border-orange-300",
      spinner: "text-orange-600",
      hover: "hover:bg-orange-50 hover:border-orange-300 hover:shadow-md transition-all duration-200",
    } as const;
  };

  const themeClasses = getThemeClasses();

  const handleConnect = async (connector: Connector) => {
    try {
      setSelectedWallet(connector.name);
      setIsConnecting(true);

      // Connect wallet
      await connect({ connector });

      // Loading akan berlanjut sampai wallet benar-benar terconnect
      // Dialog akan ditutup oleh useEffect ketika isConnected menjadi true
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      // Reset state immediately on error (including user cancellation)
      setSelectedWallet(null);
      setIsConnecting(false);
    }
  };

  const getWalletLogo = (connectorName: string) => {
    return walletLogos[connectorName] || null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button className={`${themeClasses.button} ${className}`}>
          <WalletIcon className="w-4 h-4 mr-2" />
          {connectButtonText}
        </Button>
      </DialogTrigger>

      <DialogContent
        className={`w-sm max-w-lg mx-auto ${themeClasses.dialog} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto p-4 border`}
      >
        <DialogHeader className="text-center">
          <div className="flex justify-center items-center mb-2">
            <Image
              src="/senja-logo.png"
              alt="Senja Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain mx-auto"
            />
          </div>
          <DialogTitle className={`text-lg font-bold text-center ${themeClasses.title}`}>
            <span>Connect to Senja</span>
          </DialogTitle>
          <DialogDescription className={`mt-1 text-center text-sm ${themeClasses.description}`}>
            {isConnecting
              ? `Please approve the connection in your ${selectedWallet} wallet`
              : "Choose your preferred wallet to connect to the application."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-1.5 py-2 w-full">
          {connectors.map((connector) => {
            const walletLogo = getWalletLogo(connector.name);
            const isSelected = selectedWallet === connector.name;
            const isConnectingThis = isConnecting && isSelected;

            return (
              <Button
                key={connector.uid}
                variant="outline"
                onClick={() => handleConnect(connector)}
                disabled={isConnecting}
                className={`flex items-center justify-start space-x-2 h-10 px-2 ${themeClasses.listBase} ${themeClasses.listHover} ${themeClasses.listText} ${themeClasses.listHoverText} transition-colors w-full ${
                  isSelected ? themeClasses.listSelected : ""
                } ${isConnectingThis ? "opacity-75" : ""}`}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
                  {isConnectingThis ? (
                    <Loader2 className={`w-4 h-4 ${themeClasses.spinner} animate-spin`} />
                  ) : walletLogo ? (
                    <Image
                      src={walletLogo}
                      alt={`${connector.name} logo`}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <WalletIcon className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="font-medium truncate text-sm">
                    {isConnectingThis ? "Connecting..." : connector.name}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        {isConnecting && (
          <div className="flex justify-center pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedWallet(null);
                setIsConnecting(false);
              }}
              className="text-[var(--light-gray)] hover:text-[var(--pure-white)]"
            >
              Cancel Connection
            </Button>
          </div>
        )}

        <div className="text-xs text-[var(--medium-gray)] text-center pt-4 border-t border-gray-100">
          By connecting your wallet, you agree to our Terms of Service and
          Privacy Policy.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectDialog;
