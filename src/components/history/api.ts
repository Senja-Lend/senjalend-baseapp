import React from "react";
import { GraphQLClient } from "graphql-request";
import {
  GET_USER_TRANSACTIONS,
  GET_ALL_TRANSACTIONS,
  GraphQLTransactionResponse,
} from "./queries";
import { Transaction } from "./types";

const API_URL = process.env.NEXT_PUBLIC_BASE_PONDER_URL_2 || "";

const client = new GraphQLClient(API_URL);

function transformGraphQLResponse(
  data: GraphQLTransactionResponse
): Transaction[] {
  const transactions: Transaction[] = [];

  if (data.supplyLiquidities) {
    data.supplyLiquidities.forEach((tx) => {
      transactions.push({
        id: tx.id,
        user: tx.user,
        pool: tx.pool,
        asset: tx.asset,
        amount: BigInt(tx.amount),
        shares: BigInt(tx.shares),
        onBehalfOf: tx.onBehalfOf,
        timestamp: BigInt(tx.timestamp),
        blockNumber: BigInt(tx.blockNumber),
        transactionHash: tx.transactionHash,
        type: "supply_liquidity",
      });
    });
  }

  // Transform WithdrawLiquidity transactions
  if (data.withdrawLiquidities) {
    data.withdrawLiquidities.forEach((tx) => {
      transactions.push({
        id: tx.id,
        user: tx.user,
        pool: tx.pool,
        asset: tx.asset,
        amount: BigInt(tx.amount),
        shares: BigInt(tx.shares),
        to: tx.to,
        timestamp: BigInt(tx.timestamp),
        blockNumber: BigInt(tx.blockNumber),
        transactionHash: tx.transactionHash,
        type: "withdraw_liquidity",
      });
    });
  }

  // Transform SupplyCollateral transactions
  if (data.supplyCollaterals) {
    data.supplyCollaterals.forEach((tx) => {
      transactions.push({
        id: tx.id,
        user: tx.user,
        pool: tx.pool,
        asset: tx.asset,
        amount: BigInt(tx.amount),
        onBehalfOf: tx.onBehalfOf,
        timestamp: BigInt(tx.timestamp),
        blockNumber: BigInt(tx.blockNumber),
        transactionHash: tx.transactionHash,
        type: "supply_collateral",
      });
    });
  }

  // Transform BorrowDebtCrosschain transactions
  if (data.borrowDebtCrosschains) {
    data.borrowDebtCrosschains.forEach((tx) => {
      transactions.push({
        id: tx.id,
        user: tx.user,
        pool: tx.pool,
        asset: tx.asset,
        amount: BigInt(tx.amount),
        shares: BigInt(tx.shares),
        chainId: BigInt(tx.chainId),
        addExecutorLzReceiveOption: BigInt(tx.addExecutorLzReceiveOption),
        onBehalfOf: tx.onBehalfOf,
        timestamp: BigInt(tx.timestamp),
        blockNumber: BigInt(tx.blockNumber),
        transactionHash: tx.transactionHash,
        type: "borrow_debt_crosschain",
      });
    });
  }

  // Transform PositionWithdrawCollateral transactions
  if (data.positionWithdrawCollaterals) {
    data.positionWithdrawCollaterals.forEach((tx) => {
      transactions.push({
        id: tx.id,
        user: tx.user,
        pool: tx.pool,
        positionAddress: tx.positionAddress,
        amount: BigInt(tx.amount),
        timestamp: BigInt(tx.timestamp),
        blockNumber: BigInt(tx.blockNumber),
        transactionHash: tx.transactionHash,
        type: "withdraw_collateral",
      });
    });
  }

  // Transform RepayWithCollateralByPosition transactions
  if (data.repayWithCollateralByPositions) {
    data.repayWithCollateralByPositions.forEach((tx) => {
      transactions.push({
        id: tx.id,
        user: tx.user,
        pool: tx.pool,
        asset: tx.asset,
        amount: BigInt(tx.amount),
        shares: BigInt(tx.shares),
        repayer: tx.repayer,
        timestamp: BigInt(tx.timestamp),
        blockNumber: BigInt(tx.blockNumber),
        transactionHash: tx.transactionHash,
        type: "repay",
      });
    });
  }

  // Transform PositionSwapTokenByPosition transactions
  if (data.positionSwapTokenByPositions) {
    data.positionSwapTokenByPositions.forEach((tx) => {
      transactions.push({
        id: tx.id,
        user: tx.user,
        pool: tx.pool,
        positionAddress: tx.positionAddress,
        tokenIn: tx.tokenIn,
        tokenOut: tx.tokenOut,
        amountIn: BigInt(tx.amountIn),
        amountOut: BigInt(tx.amountOut),
        timestamp: BigInt(tx.timestamp),
        blockNumber: BigInt(tx.blockNumber),
        transactionHash: tx.transactionHash,
        type: "swap_collateral",
      });
    });
  }

  // Sort by timestamp descending (newest first)
  return transactions.sort((a, b) => {
    if (a.timestamp > b.timestamp) return -1;
    if (a.timestamp < b.timestamp) return 1;
    return 0;
  });
}

export async function fetchUserTransactions(
  userAddress: string,
  first: number = 50,
  skip: number = 0
): Promise<Transaction[]> {
  try {
    const data = await client.request<GraphQLTransactionResponse>(
      GET_USER_TRANSACTIONS,
      {
        user: userAddress.toLowerCase(),
      }
    );

    return transformGraphQLResponse(data);
  } catch (error) {
    console.error("Failed to fetch transaction history:", error);
    throw new Error("Failed to fetch transaction history");
  }
}

export async function fetchAllTransactions(
  first: number = 50,
  skip: number = 0
): Promise<Transaction[]> {
  try {
    const data = await client.request<GraphQLTransactionResponse>(
      GET_ALL_TRANSACTIONS,
      {}
    );

    return transformGraphQLResponse(data);
  } catch (error) {
    console.error("Failed to fetch transaction history:", error);
    throw new Error("Failed to fetch transaction history");
  }
}

// Hook for easy data fetching with loading and error states
export function useTransactions(userAddress?: string) {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadTransactions() {
      try {
        setLoading(true);
        setError(null);

        if (userAddress) {
          const data = await fetchUserTransactions(userAddress);
          setTransactions(data);
        } else {
          setTransactions([]);
        }
      } catch (err) {
        console.error("Error loading transactions:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, [userAddress]);

  const refetch = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (userAddress) {
        const data = await fetchUserTransactions(userAddress);
        setTransactions(data);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, [userAddress]);

  return { transactions, loading, error, refetch };
}
