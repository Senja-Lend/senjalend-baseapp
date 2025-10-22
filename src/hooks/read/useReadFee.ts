import { useReadContract } from "wagmi";
import { useAccount } from "wagmi";
import { useMemo } from "react";
import { helperAbi } from "@/lib/abis/helperAbi";
import { helperAddress } from "@/lib/addresses/tokenAddress";
import { parseAmountToBigIntSafe } from "@/utils/format";
import { Token } from "@/types";

export type HexAddress = `0x${string}`;

export const useReadFee = (
  destinationEndpoint: number,
  amount: string | bigint,
  decimal: number,
  token: Token
) => {
  const { address } = useAccount();
  const oftAddress = token.oftAddress;
  
  // Validate that token has oftAddress
  if (!oftAddress) {
    throw new Error(`Token ${token.symbol} does not have an OFT address configured`);
  }
  
  // Parse amount to bigint with proper decimal handling
  const parsedAmount = useMemo(() => {
    if (typeof amount === "bigint") {
      return amount;
    }
    return parseAmountToBigIntSafe(amount, decimal);
  }, [amount, decimal]);

  // If destination endpoint is Base (30184), fee is 0 (Base to Base)
  const isBaseEndpoint = destinationEndpoint === 30184;

  const {
    data: rawFee,
    isLoading: feeLoading,
    error: feeError,
    refetch: refetchFee,
  } = useReadContract({
    address: helperAddress,
    abi: helperAbi,
    functionName: "getFee",
    args: [
      oftAddress as HexAddress,
      destinationEndpoint,
      address as HexAddress,
      parsedAmount,
    ],
    query: {
      enabled: !isBaseEndpoint, // Only call contract if not Base endpoint
    },
  });

  // Convert fee to 18 decimals and handle Base endpoint
  const fee = useMemo(() => {
    if (isBaseEndpoint) {
      return BigInt(0); // Fee is 0 for Base endpoint
    }
    
    if (!rawFee) {
      return BigInt(0);
    }

    // Convert fee to 18 decimals
    const feeBigInt = rawFee as bigint;
    // Assuming the fee comes in native token decimals, convert to 18 decimals
    return feeBigInt;
  }, [rawFee, isBaseEndpoint]);

  return {
    fee: fee,
    feeLoading: isBaseEndpoint ? false : feeLoading, // No loading for Base endpoint
    feeError: isBaseEndpoint ? null : feeError, // No error for Base endpoint
    refetchFee,
    parsedAmount,
  };
};
