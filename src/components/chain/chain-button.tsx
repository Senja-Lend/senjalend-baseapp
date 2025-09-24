"use client";
import { memo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { chains } from "@/lib/addresses/chainAddress";

interface ChainButtonProps {
  className?: string;
  showStatus?: boolean;
}

export const ChainButton = memo(function ChainButton({ 
  className = "", 
  showStatus = true 
}: ChainButtonProps) {
  const { isConnected, chain } = useAccount();
  const { openChainModal } = useChainModal();

  if (!isConnected || !chain) {
    return null;
  }

  // Find chain info from our chain configuration
  const chainInfo = chains.find(c => c.id === chain.id);
  const chainLogo = chainInfo?.logo || "/chain/ethereum.png"; // fallback to ethereum logo
  const isDisabled = chainInfo?.disabled || false;
  const isComingSoon = chainInfo?.comingSoon || false;

  // Determine status color
  const getStatusColor = () => {
    if (isComingSoon) return "bg-yellow-400";
    if (isDisabled) return "bg-red-400";
    return "bg-green-400";
  };

  return (
    <Button 
      onClick={openChainModal}
      className={`bg-orange-50 text-green-600 border border-orange-200 hover:bg-orange-100 transition-colors ${className}`}
      disabled={isDisabled}
    >
      <div className="flex items-center gap-2">
        {showStatus && (
          <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
        )}
        <div className="w-4 h-4 relative">
          <Image
            src={chainLogo}
            alt={`${chain.name} logo`}
            width={16}
            height={16}
            className="rounded-full"
          />
        </div>
        <span className="font-medium">{chain.name}</span>
        {isComingSoon && (
          <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full">
            Soon
          </span>
        )}
      </div>
    </Button>
  );
});
