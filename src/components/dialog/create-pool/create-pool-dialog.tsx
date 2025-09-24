"use client";

import React, { useState, memo, useCallback, FormEvent, ChangeEvent } from "react";
import { X, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TokenSelector } from "@/components/select/token";
import { useCreatePool } from "@/hooks/write/useCreatePool";
import { SuccessAlert } from "@/components/alert";
import { useCurrentChainId } from "@/lib/chain";
import { Token, BaseComponentProps } from "@/types";
import { dialogStyles, buttonStyles, inputStyles, spacing } from "@/styles/common";
import { PLACEHOLDERS, BUTTON_TEXTS, LOADING_MESSAGES, SUCCESS_MESSAGES, ERROR_MESSAGES, VALIDATION } from "@/lib/constants";
import { BearyWalletConnectionGuard } from "@/components/wallet/beary-wallet-connection-guard";
import { useAccount } from "wagmi";

/**
 * Props for the CreatePoolDialog component
 */
interface CreatePoolDialogProps extends BaseComponentProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Callback when dialog is closed */
  onClose: () => void;
  /** Callback when pool creation is successful */
  onSuccess?: () => void;
}

/**
 * CreatePoolDialog component for creating new lending pools
 * 
 * @param props - Component props
 * @returns JSX element
 */
export const CreatePoolDialog = memo(function CreatePoolDialog({
  isOpen,
  onClose,
  onSuccess,
  className,
}: CreatePoolDialogProps) {
  const [collateralToken, setCollateralToken] = useState<Token | undefined>();
  const [borrowToken, setBorrowToken] = useState<Token | undefined>();
  const [ltv, setLtv] = useState("");
  const [isWalletGuardActive, setIsWalletGuardActive] = useState(false);
  const [pendingCreateAction, setPendingCreateAction] = useState<(() => void) | null>(null);
  const currentChainId = useCurrentChainId();
  const { isConnected, chainId } = useAccount();
  const router = useRouter();

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setCollateralToken(undefined);
    setBorrowToken(undefined);
    setLtv("");
    setIsWalletGuardActive(false);
    setPendingCreateAction(null);
  }, []);

  // Check if wallet is connected and on correct chain
  const isOnTargetChain = chainId === 8453; // Kaia chain ID
  const isWalletReady = isConnected && isOnTargetChain;

  // Form validation
  const isValid =
    collateralToken &&
    borrowToken &&
    ltv &&
    parseFloat(ltv) >= VALIDATION.LTV_MIN &&
    parseFloat(ltv) <= VALIDATION.LTV_MAX;

  const { 
    handleCreate, 
    isCreating, 
    isConfirming, 
    isSuccess, 
    isError, 
    txHash, 
    showSuccessAlert, 
    successTxHash, 
    handleCloseSuccessAlert,
    isUserRejection,
    resetUserRejection
  } = useCreatePool(() => {
    onSuccess?.();
    onClose();
    resetForm();
  });

  /**
   * Handle wallet guard ready
   */
  const handleWalletReady = useCallback(() => {
    setIsWalletGuardActive(false);
    
    // Execute pending action if there is one
    if (pendingCreateAction) {
      pendingCreateAction();
      setPendingCreateAction(null);
    }
  }, [pendingCreateAction]);

  /**
   * Handle wallet guard cancel
   */
  const handleCancelWallet = useCallback(() => {
    setIsWalletGuardActive(false);
    setPendingCreateAction(null);
  }, []);

  /**
   * Handle connect wallet redirect
   */
  const handleConnectWallet = useCallback(() => {
    router.push("/profile");
  }, [router]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if wallet is ready first
    if (!isWalletReady) {
      handleConnectWallet();
      return;
    }

    if (!isValid) {
      return;
    }

    // Proceed with pool creation
    const collateralAddress = collateralToken!.addresses[currentChainId];
    const borrowAddress = borrowToken!.addresses[currentChainId];

    if (!collateralAddress || !borrowAddress) {
      return;
    }

    await handleCreate(collateralAddress, borrowAddress, ltv);
  }, [collateralToken, borrowToken, ltv, handleCreate, isValid, currentChainId, isWalletReady, handleConnectWallet]);

  /**
   * Handle dialog close
   */
  const handleClose = useCallback(() => {
    if (!isCreating && !isConfirming) {
      onClose();
      resetForm();
      resetUserRejection(); // Reset user rejection state when closing dialog
    }
  }, [isCreating, isConfirming, onClose, resetForm, resetUserRejection]);

  /**
   * Handle LTV input change
   */
   
  const handleLtvChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLtv(e.target.value);
  }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className={`${dialogStyles.content} ${className || ''}`}>
          <DialogHeader className={dialogStyles.header}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-bold">+</span>
                </div>
                <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900">
                  {BUTTON_TEXTS.CREATE_POOL}
                </DialogTitle>
              </div>
              <Button
                type="button"
                onClick={handleClose}
                disabled={isCreating || isConfirming}
                className="p-2 hover:bg-orange-200 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-gray-600 hover:text-gray-800" />
              </Button>
            </div>
          </DialogHeader>

        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <form onSubmit={handleSubmit} className={spacing.form} noValidate>
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mx-auto">
              <div className="space-y-2 sm:space-y-3 flex w-full sm:w-[45%] flex-col text-left">
                <label className="text-sm sm:text-base font-medium text-gray-700">
                  Collateral Token
                </label>
                <TokenSelector
                  selectedToken={collateralToken}
                  onTokenSelect={setCollateralToken}
                  otherToken={borrowToken}
                  label="Select collateral token"
                />
              </div>

              {/* Borrow Token */}
              <div className="space-y-2 sm:space-y-3 flex w-full sm:w-[45%] flex-col text-left sm:text-right">
                <label className="text-sm sm:text-base font-medium text-gray-700">
                  Borrow Token
                </label>
                <TokenSelector
                  selectedToken={borrowToken}
                  onTokenSelect={setBorrowToken}
                  otherToken={collateralToken}
                  label="Select borrow token"
                />
              </div>
            </div>

            {/* LTV */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-medium text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Loan-to-Value (LTV) %
              </label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder={PLACEHOLDERS.LTV_INPUT}
                  value={ltv}
                  onChange={handleLtvChange}
                  min={VALIDATION.LTV_MIN.toString()}
                  max={VALIDATION.LTV_MAX.toString()}
                  step="0.1"
                  className={inputStyles.default}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }}
                />
              </div>
            </div>

            {/* Transaction Status */}
            {(isCreating || isConfirming || isSuccess || isError || isUserRejection) && (
              <Card className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl">
                <div className="space-y-3">
                  {isCreating && (
                    <div className="flex items-center gap-3 text-blue-600">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                       <span className="text-sm font-semibold">
                         {LOADING_MESSAGES.CREATING_POOL}
                       </span>
                    </div>
                  )}

                  {isConfirming && (
                    <div className="flex items-center gap-3 text-orange-600">
                      <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                       <span className="text-sm font-semibold">
                         {LOADING_MESSAGES.CONFIRMING_TRANSACTION}
                       </span>
                    </div>
                  )}

                  {isSuccess && (
                    <div className="flex items-center gap-3 text-green-600">
                      <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                       <span className="text-sm font-semibold">
                         {SUCCESS_MESSAGES.POOL_CREATED}
                       </span>
                    </div>
                  )}

                  {isError && (
                    <div className="flex items-center gap-3 text-red-600">
                      <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                       <span className="text-sm font-semibold">
                         {ERROR_MESSAGES.TRANSACTION_FAILED}
                       </span>
                    </div>
                  )}

                  {isUserRejection && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                       <span className="text-sm font-semibold">
                         Transaction cancelled
                       </span>
                    </div>
                  )}

                  {txHash && (
                    <div className="text-xs text-gray-500 break-all bg-white p-2 rounded border">
                      <span className="font-medium">Transaction Hash:</span>
                      <br />
                      {txHash}
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isCreating || isConfirming}
              className={`w-full h-12 sm:h-14 text-base sm:text-lg font-bold ${buttonStyles.primary} disabled:opacity-50 disabled:cursor-not-allowed rounded-xl`}
              onClick={() => {
                // Reset user rejection state when user tries to submit again
                if (isUserRejection) {
                  resetUserRejection();
                }
              }}
            >
              {isCreating
                ? LOADING_MESSAGES.CREATING_POOL
                : isConfirming
                ? LOADING_MESSAGES.CONFIRMING_TRANSACTION
                : !isWalletReady
                ? (
                    <>
                      <Wallet className="h-4 w-4 mr-2" />
                      Connect Wallet
                    </>
                  )
                : BUTTON_TEXTS.CREATE_POOL}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
    
    {/* Success Alert */}
    <SuccessAlert
      isOpen={showSuccessAlert}
      onClose={handleCloseSuccessAlert}
      title="Transaction success"
      description="tx hash:"
      buttonText="Close"
      txHash={successTxHash}
      chainId={currentChainId}
    />

    {/* Wallet Connection Guard */}
    <BearyWalletConnectionGuard
      isActive={isWalletGuardActive}
      onReady={handleWalletReady}
      onCancel={handleCancelWallet}
      targetChainId={8453}
    />
  </>
  );
});
