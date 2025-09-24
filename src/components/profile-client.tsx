"use client";
import { useState, useCallback, memo } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, CreditCard, Copy } from "lucide-react";
import { UserPortfolio } from "./profile/user-portfolio";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import ButtonConnectWallet from "./button/button-connect-wallet";

const ProfileClient = memo(function ProfileClient() {
  // RainbowKit hooks
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
    <div className="min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 rounded-full blur-xl opacity-30 scale-110"></div>
            <div className="relative inline-flex items-center justify-center overflow-hidden">
              <Image
                src="/beary/beary.png"
                alt="Profile Picture"
                width={128}
                height={128}
                className="object-cover rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 border-4 border-white"
                priority
              />
            </div>
          </div>
        </div>

        {/* Wallet Connection Card */}
        <Card className="mb-4 sm:mb-6 shadow-2xl border border-orange-200 bg-gradient-to-br from-white via-orange-50/30 to-pink-50/30 backdrop-blur-sm mx-auto max-w-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-300/20 to-pink-300/20 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-300/20 to-red-300/20 rounded-full translate-y-8 -translate-x-8"></div>

          <CardHeader className="px-3 sm:px-6">
            <div className="flex gap-3 justify-between">
              <CardTitle className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-orange-pink rounded-full flex items-center justify-center">
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                Wallet Connection
              </CardTitle>
              {isConnected && (
                <Badge
                  variant="default"
                  className="bg-orange-50 text-green-600 border border-orange-200 self-start sm:self-auto"
                >
                  <div className="w-2 h-2 bg-sunset-orange rounded-full mr-2"></div>
                  Connected
                </Badge>
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
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-orange-pink rounded-full flex items-center justify-center">
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs sm:text-sm text-gray-600">
                        Address
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-xs sm:text-sm font-medium truncate">
                          {formatAddress(address || "")}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => copyToClipboard(address || "")}
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 sm:h-6 sm:w-6 p-0 hover:bg-orange-100 flex-shrink-0"
                          >
                            <Copy className="w-3 h-3 text-sunset-orange" />
                          </Button>
                          {copied && (
                            <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap animate-in fade-in duration-200">
                              Copied!
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Balance Section */}
                  <div className="border-t border-orange-200 pt-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-600">
                          Balance
                        </p>
                        {balance ? (
                          <p className="text-base sm:text-lg font-semibold text-gray-900">
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
                      variant="outline"
                      className="w-full rounded-lg text-sunset-red border-sunset-red/20 hover:bg-red-500 hover:text-white text-sm"
                    >
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

                {/* RainbowKit Connect Button */}
                <div className="flex justify-center">
                  <ButtonConnectWallet />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Portfolio Section */}
        {isConnected && <UserPortfolio className="mb-4 sm:mb-6" />}
      </div>
    </div>
  );
});

export default ProfileClient;
