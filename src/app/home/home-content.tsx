"use client";

import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PoolsOverview } from "@/components/table/pools-overview";
import { LendingPoolWithTokens } from "@/lib/graphql/lendingpool-list.fetch";
import { BearyWalletConnectionGuard } from "@/components/wallet/beary-wallet-connection-guard";
import { useWalletConnectionGuard } from "@/hooks/useWalletConnectionGuard";
import { SupplyTab, BorrowTab, RepayTab, WithdrawTab } from "@/components/tabs";

interface PoolsOverviewWithCustomHandlerProps {
  onPoolClick: (pool: LendingPoolWithTokens) => void;
}

const PoolsOverviewWithCustomHandler = ({
  onPoolClick,
}: PoolsOverviewWithCustomHandlerProps) => {
  return <PoolsOverview onPoolClick={onPoolClick} />;
};

const Page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("supply");
  const [selectedPool, setSelectedPool] =
    useState<LendingPoolWithTokens | null>(null);

  const {
    isGuardActive,
    selectedPool: guardSelectedPool,
    triggerWalletGuard,
    handleWalletReady,
    handleCancelWallet,
    isWalletReady,
  } = useWalletConnectionGuard();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handlePoolClick = useCallback(
    (pool: LendingPoolWithTokens) => {
      triggerWalletGuard(pool);
    },
    [triggerWalletGuard]
  );

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
    setSelectedPool(null);
    if (guardSelectedPool) {
      handleCancelWallet();
    }
  }, [guardSelectedPool, handleCancelWallet]);

  const handleWalletReadyAndOpenDialog = useCallback(() => {
    if (guardSelectedPool) {
      setSelectedPool(guardSelectedPool);
      setIsDialogOpen(true);
    }
  }, [guardSelectedPool]);

  React.useEffect(() => {
    if (isWalletReady && guardSelectedPool && !isDialogOpen && !isGuardActive) {
      handleWalletReadyAndOpenDialog();
    }
  }, [
    isWalletReady,
    guardSelectedPool,
    isDialogOpen,
    isGuardActive,
    handleWalletReadyAndOpenDialog,
  ]);

  return (
    <div className="min-h-screen w-full pb-20 relative overflow-hidden bg-gradient-to-br from-senja-background via-senja-cream/30 to-senja-cream-light/40 flex mt-8">
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 lg:px-8 -mt-2">
        <div className="relative">
          <PoolsOverviewWithCustomHandler onPoolClick={handlePoolClick} />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-sm border-senja-orange/30 w-[calc(100vw-2rem)] sm:w-full">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gradient-sunset text-center">
                {selectedPool
                  ? `${selectedPool.collateralTokenInfo?.symbol} / ${selectedPool.borrowTokenInfo?.symbol}`
                  : ""}
              </DialogTitle>
            </DialogHeader>

            {selectedPool && (
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsList className="grid h-12 w-full grid-cols-4 bg-orange-50 border-2 border-orange-200 rounded-lg p-1 shadow-lg">
                  <TabsTrigger
                    value="supply"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-pink-400 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 rounded-md font-semibold m-0 flex items-center justify-center"
                  >
                    Supply
                  </TabsTrigger>
                  <TabsTrigger
                    value="borrow"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-pink-400 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 rounded-md font-semibold m-0 flex items-center justify-center"
                  >
                    Borrow
                  </TabsTrigger>
                  <TabsTrigger
                    value="repay"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-pink-400 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 rounded-md font-semibold m-0 flex items-center justify-center"
                  >
                    Repay
                  </TabsTrigger>
                  <TabsTrigger
                    value="withdraw"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-pink-400 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 rounded-md font-semibold m-0 flex items-center justify-center"
                  >
                    Withdraw
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="supply" className="mt-6">
                  <SupplyTab pool={selectedPool} />
                </TabsContent>

                <TabsContent value="borrow" className="mt-6">
                  <BorrowTab pool={selectedPool} />
                </TabsContent>

                <TabsContent value="repay" className="mt-6">
                  <RepayTab pool={selectedPool} />
                </TabsContent>

                <TabsContent value="withdraw" className="mt-6">
                  <WithdrawTab pool={selectedPool} />
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <BearyWalletConnectionGuard
        isActive={isGuardActive}
        onReady={handleWalletReady}
        onCancel={handleCancelWallet}
        pool={guardSelectedPool || undefined}
        targetChainId={8453}
      />
    </div>
  );
};

export default Page;
