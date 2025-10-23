import React from "react";
import { Transaction } from "./types";
import { TokenDisplay } from "./TokenDisplay";
import { TransactionTypeBadge } from "./TransactionTypeBadge";
import {
  formatTokenAmount,
  formatTimestamp,
  shortenAddress,
  getTokenByAddress,
} from "./utils";
import { ExternalLinkIcon } from "lucide-react";

interface TransactionTableProps {
  transactions: Transaction[];
  loading?: boolean;
  chainId?: number;
}

export function TransactionTable({
  transactions,
  loading = false,
  chainId = 8453,
}: TransactionTableProps) {
  return (
    <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
      <div>
        {loading ? (
          [...Array(3)].map((_, index) => (
            <div
              key={`mobile-loading-${index}`}
              className="p-3 sm:p-4 border-b border-gray-100 animate-pulse"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-4"></div>
              </div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-3 bg-gray-200 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : transactions.length === 0 ? (
          // Mobile empty state
          <div className="p-6 sm:p-8 text-center">
            <div className="text-gray-800 text-lg mb-2">
              No transactions found
            </div>
            <div className="text-gray-400 text-sm">
              Your transaction history will appear here
            </div>
          </div>
        ) : (
          // Mobile data cards - filter out transactions with unknown tokens
          transactions
            .filter((transaction) => {
              // For swap transactions, check both tokenIn and tokenOut
              if (transaction.type === "swap_collateral") {
                const tokenIn = getTokenByAddress(transaction.tokenIn, chainId);
                const tokenOut = getTokenByAddress(
                  transaction.tokenOut,
                  chainId
                );
                return tokenIn !== null && tokenOut !== null;
              }
              // For withdraw_collateral, we don't filter by asset since it doesn't have one
              // We'll get the token from pool.token0 or pool.token1
              if (transaction.type === "withdraw_collateral") {
                return true;
              }
              // For other transactions, check asset field
              if ("asset" in transaction) {
                const token = getTokenByAddress(transaction.asset, chainId);
                return token !== null;
              }
              return true;
            })
            .map((transaction) => {
              // Determine the display information based on transaction type
              let assetDisplay: React.ReactNode;
              let amountDisplay: React.ReactNode;

              if (transaction.type === "swap_collateral") {
                const tokenIn = getTokenByAddress(transaction.tokenIn, chainId);
                const tokenOut = getTokenByAddress(
                  transaction.tokenOut,
                  chainId
                );
                const formattedAmountIn = formatTokenAmount(
                  transaction.amountIn,
                  tokenIn!.decimals
                );
                const formattedAmountOut = formatTokenAmount(
                  transaction.amountOut,
                  tokenOut!.decimals
                );

                assetDisplay = (
                  <div className="flex items-center gap-1">
                    <TokenDisplay
                      address={transaction.tokenIn}
                      chainId={chainId}
                    />
                    <span className="text-xs">→</span>
                    <TokenDisplay
                      address={transaction.tokenOut}
                      chainId={chainId}
                    />
                  </div>
                );

                amountDisplay = (
                  <div className="text-sm font-medium text-gray-800">
                    {formattedAmountIn} {tokenIn?.symbol} → {formattedAmountOut}{" "}
                    {tokenOut?.symbol}
                  </div>
                );
              } else if (transaction.type === "withdraw_collateral") {
                // For withdraw collateral, show position address since no pool/asset
                assetDisplay = (
                  <span className="text-sm text-gray-800">
                    Position: {shortenAddress(transaction.positionAddress)}
                  </span>
                );

                // Format amount with 18 decimals for WETH (assuming it's WETH)
                const formattedAmount = formatTokenAmount(
                  transaction.amount,
                  18
                );
                amountDisplay = (
                  <div className="text-sm font-medium text-gray-800">
                    {formattedAmount} WETH
                  </div>
                );
              } else if ("asset" in transaction) {
                const token = getTokenByAddress(transaction.asset, chainId);
                const formattedAmount = formatTokenAmount(
                  transaction.amount,
                  token!.decimals
                );

                assetDisplay = (
                  <TokenDisplay address={transaction.asset} chainId={chainId} />
                );

                amountDisplay = (
                  <div className="text-sm font-medium text-gray-800">
                    {formattedAmount} {token?.symbol || "Unknown"}
                  </div>
                );
              } else {
                assetDisplay = (
                  <span className="text-sm text-gray-800">N/A</span>
                );
                amountDisplay = (
                  <span className="text-sm text-gray-800">N/A</span>
                );
              }

              return (
                <div
                  key={transaction.id}
                  className="p-3 sm:p-4 border-b border-gray-800/50 last:border-b-0"
                >
                  <div className="flex justify-between items-start mb-2">
                    <TransactionTypeBadge type={transaction.type} />
                    <a
                      href={
                        chainId === 8453
                          ? `https://basescan.org/tx/${transaction.transactionHash}`
                          : `https://layerzeroscan.com/tx/${transaction.transactionHash}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-gray-800 hover:text-blue-800/80 hover:underline"
                    >
                      <ExternalLinkIcon className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-800">Asset:</span>
                      <div className="text-gray-800">{assetDisplay}</div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-800">Amount:</span>
                      {amountDisplay}
                    </div>

                    {/* Only show pool for transactions that have pool field */}
                    {"pool" in transaction && transaction.pool && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-800">Pool:</span>
                        <div className="text-sm text-gray-800">
                          {shortenAddress(transaction.pool.address)}
                        </div>
                      </div>
                    )}

                    {/* Show position address for withdraw collateral */}
                    {transaction.type === "withdraw_collateral" && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-800">Position:</span>
                        <div className="text-sm text-gray-800">
                          {shortenAddress(transaction.positionAddress)}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-800">Time:</span>
                      <div className="text-sm text-gray-800">
                        {formatTimestamp(transaction.timestamp)}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-800">Block:</span>
                      <div className="text-xs text-gray-800">
                        {transaction.blockNumber.toString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}
