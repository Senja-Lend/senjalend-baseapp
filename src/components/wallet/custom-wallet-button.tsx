"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { Copy, Wallet, LogOut, ExternalLink } from "lucide-react";
import { formatEther } from "viem";

interface CustomWalletButtonProps {
  className?: string;
  connectButtonText?: string;
  showBalance?: boolean;
  showAddress?: boolean;
  theme?: "default" | "senja" | "blue";
}

export const CustomWalletButton: React.FC<CustomWalletButtonProps> = ({
  className = "",
  connectButtonText = "Connect Wallet",
  showBalance = true,
  showAddress = true,
  theme = "default"
}) => {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });
  const [copied, setCopied] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case "senja":
        return {
          connect: "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white",
          connected: "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white",
          dropdown: "bg-white border border-gray-200 shadow-lg"
        };
      case "blue":
        return {
          connect: "bg-blue-600 hover:bg-blue-700 text-white",
          connected: "bg-blue-600 hover:bg-blue-700 text-white",
          dropdown: "bg-white border border-gray-200 shadow-lg"
        };
      default:
        return {
          connect: "bg-gray-900 hover:bg-gray-800 text-white",
          connected: "bg-gray-900 hover:bg-gray-800 text-white",
          dropdown: "bg-white border border-gray-200 shadow-lg"
        };
    }
  };

  const themeClasses = getThemeClasses();

  if (!isConnected) {
    return (
      <Button
        onClick={() => connect({ connector: connectors[0] })}
        className={`${themeClasses.connect} ${className}`}
      >
        <Wallet className="w-4 h-4 mr-2" />
        {connectButtonText}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={`${themeClasses.connected} ${className}`}>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <Image
                src="/beary/user-profil.png"
                alt="User Profile"
                width={24}
                height={24}
                className="w-full h-full object-cover"
                style={{
                  filter: 'drop-shadow(0 0 0 2px rgba(255,255,255,0.8)) drop-shadow(0 0 0 3px rgba(255,255,255,0.4))'
                }}
              />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium">
                {showAddress && address ? formatAddress(address) : "Connected"}
              </div>
              {showBalance && balance && (
                <div className="text-xs opacity-90">
                  {parseFloat(formatEther(balance.value)).toFixed(4)} ETH
                </div>
              )}
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className={`w-64 ${themeClasses.dropdown}`} align="end">
        {/* Wallet Info */}
        <div className="px-3 py-2 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/beary/user-profil.png"
                alt="User Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover drop-shadow-[0_0_0_2px_rgba(251,146,60,0.4)]"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {showAddress && address ? formatAddress(address) : "Connected"}
              </div>
              <div className="text-xs text-gray-500">
                {chain?.name || "Unknown Network"}
              </div>
            </div>
          </div>
        </div>

        {/* Balance */}
        {showBalance && balance && (
          <div className="px-3 py-2 border-b border-gray-100">
            <div className="text-sm text-gray-600">Balance</div>
            <div className="text-lg font-semibold text-gray-900">
              {parseFloat(formatEther(balance.value)).toFixed(4)} ETH
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="py-1">
          {showAddress && address && (
            <DropdownMenuItem
              onClick={() => copyToClipboard(address)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? "Copied!" : "Copy Address"}</span>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuItem
            onClick={() => window.open("https://keys.coinbase.com", "_blank")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Wallet Settings</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            onClick={() => disconnect()}
            className="flex items-center space-x-2 cursor-pointer text-red-600 hover:text-red-700"
          >
            <LogOut className="w-4 h-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomWalletButton;
