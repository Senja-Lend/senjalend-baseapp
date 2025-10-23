import { helperAbi } from "@/lib/abis/helperAbi";
import { useReadContract } from "wagmi";
import { helperAddress } from "@/lib/addresses/tokenAddress";

export type HexAddress = `0x${string}`;

export const useReadApy = (lendingPoolAddress: HexAddress) => {
  const {
    data: apyData,
    isLoading: apyLoading,
    error: apyError,
    refetch: refetchApy,
  } = useReadContract({
    address: helperAddress,
    abi: helperAbi,
    functionName: "getAPY",
    args: [lendingPoolAddress as HexAddress],
  });

  // Format APY values - data dari blockchain di-scale dengan 1e18
  const formatApyValue = (value: bigint | undefined): string => {
    if (!value) return "0";

    try {
      const apyNumber = (Number(value) / Math.pow(10, 18)) * 100;
      return apyNumber.toFixed(2);
    } catch {
      return "0.00000";
    }
  };

  // Extract supply APY, borrow APY, dan utilization rate
  const apyArray = apyData as [bigint, bigint, bigint] | undefined;

  const supplyAPY = apyArray?.[0];
  const borrowAPY = apyArray?.[1];
  const utilizationRate = apyArray?.[2];

  const supplyApyFormatted = formatApyValue(supplyAPY);
  const borrowApyFormatted = formatApyValue(borrowAPY);
  const utilizationRateFormatted = formatApyValue(utilizationRate);

  return {
    apy: apyArray,
    supplyAPY,
    borrowAPY,
    utilizationRate,
    supplyApyFormatted,
    borrowApyFormatted,
    utilizationRateFormatted,
    apyLoading,
    apyError,
    refetchApy,
  };
};


