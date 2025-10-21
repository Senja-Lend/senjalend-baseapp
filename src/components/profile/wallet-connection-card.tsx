"use client";

import { useState, useCallback, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, CreditCard, Copy, LogOut } from "lucide-react";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import CustomWalletButton from "@/components/wallet/custom-wallet-button";
import NetworkSwitchDialog from "@/components/wallet/network-switch-dialog";

export const WalletConnectionCard = memo(function WalletConnectionCard() {
  // Wagmi hooks
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();

  const [copied, setCopied] = useState(false);

  const formatAddress = useCallback(
    (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`,
    []
  );

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  }, []);

  return (
    <div className="mb-4 sm:mb-6 mx-auto max-w-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-200/30 to-orange-300/30 rounded-full -translate-y-10 translate-x-10"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-orange-300/30 to-pink-200/30 rounded-full translate-y-8 -translate-x-8"></div>

      <Card className="bg-white/80 backdrop-blur-sm border border-orange-200 shadow-xl">
        <CardHeader className="px-3 sm:px-6">
          <div className="flex gap-3 justify-between">
            <CardTitle className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-gray-900">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              Wallet Connection
            </CardTitle>
            {isConnected && (
              <div className="self-start sm:self-auto">
                <CustomWalletButton
                  theme="default"
                  showBalance={false}
                  showAddress={false}
                  className="text-sm px-3 py-1 h-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg"
                />
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="px-3 sm:px-6 relative z-10">
          {isConnected ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                Connected Wallet
              </h3>

              {/* Wallet Info Display */}
              <div className="bg-orange-50 rounded-lg p-3 sm:p-4 border border-orange-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs sm:text-sm text-gray-600">
                      Address
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-xs sm:text-sm font-medium truncate text-gray-900">
                        {formatAddress(address || "")}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => copyToClipboard(address || "")}
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 sm:h-6 sm:w-6 p-0 hover:bg-orange-100 flex-shrink-0"
                        >
                          <Copy className="w-3 h-3 text-orange-600" />
                        </Button>
                        {copied && (
                          <div className="bg-orange-600 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap animate-in fade-in duration-200">
                            Copied!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Network Switch Section */}
                <div className="border-t border-orange-200 pt-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-gray-600 font-mono mb-2">
                        Network
                      </p>
                      <NetworkSwitchDialog
                        theme="senja"
                        className="text-sm"
                        showChainName={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Balance Section */}
                <div className="border-t border-orange-200 pt-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm text-gray-600 font-mono">
                        Balance
                      </p>
                      {balance ? (
                        <p className="text-base sm:text-md font-mono text-gray-900">
                          {parseFloat(balance.formatted).toFixed(4)}{" "}
                          {balance.symbol}
                        </p>
                      ) : (
                        <p className="text-xs sm:text-sm text-gray-500">
                          Loading balance...
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Disconnect Button */}
                <div className="mt-4 pt-3 border-t border-orange-200">
                  <Button
                    onClick={() => disconnect()}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm flex items-center justify-center gap-2 w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Disconnect
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8 px-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Connect Your Wallet
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Connect your wallet to view your profile and portfolio
              </p>

              {/* Custom Senja Wallet Button */}
              <div className="flex justify-center">
                <CustomWalletButton
                  theme="senja"
                  connectButtonText="Connect to Senja"
                  className="text-base px-6 py-3"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
});