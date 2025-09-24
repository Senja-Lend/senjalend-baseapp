"use client";

import React, { useState, memo, useCallback } from 'react';
import { Plus, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { CreatePoolDialog } from './create-pool-dialog';

interface CreatePoolButtonProps {
  onSuccess?: () => void;
  className?: string;
}

export const CreatePoolButton = memo(function CreatePoolButton({
  onSuccess,
  className = "",
}: CreatePoolButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isConnected, chainId } = useAccount();
  const router = useRouter();

  // Check if wallet is connected and on correct chain
  const isOnTargetChain = chainId === 8453; // Kaia chain ID
  const isWalletReady = isConnected && isOnTargetChain;

  const handleSuccess = () => {
    onSuccess?.();
    setIsDialogOpen(false);
  };

  const handleConnectWallet = useCallback(() => {
    router.push("/profile");
  }, [router]);

  const handleButtonClick = useCallback(() => {
    if (!isWalletReady) {
      handleConnectWallet();
    } else {
      setIsDialogOpen(true);
    }
  }, [isWalletReady, handleConnectWallet]);

  return (
    <>
      <Button
        onClick={handleButtonClick}
        className={`flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 ${className}`}
      >
        {isWalletReady ? (
          <>
            <Plus className="h-4 w-4" />
            Create Pool
          </>
        ) : (
          <>
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </>
        )}
      </Button>

      <CreatePoolDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
});
