export interface PoolObject {
  id: string;
  address: string;
  token0: string;
  token1: string;
}

export interface UserObject {
  id: string;
  address: string;
}

export interface BaseTransaction {
  id: string;
  user: UserObject;
  pool: PoolObject;
  timestamp: bigint;
  blockNumber: bigint;
  transactionHash: string;
}

export interface SupplyLiquidityTransaction extends BaseTransaction {
  asset: string;
  amount: bigint;
  shares: bigint;
  onBehalfOf: string;
  type: 'supply_liquidity';
}

export interface WithdrawLiquidityTransaction extends BaseTransaction {
  asset: string;
  amount: bigint;
  shares: bigint;
  to: string;
  type: 'withdraw_liquidity';
}

export interface BorrowDebtCrosschainTransaction extends BaseTransaction {
  asset: string;
  amount: bigint;
  shares: bigint;
  chainId: bigint;
  addExecutorLzReceiveOption: bigint;
  onBehalfOf: string;
  type: 'borrow_debt_crosschain';
}

export interface SupplyCollateralTransaction extends BaseTransaction {
  asset: string;
  amount: bigint;
  onBehalfOf: string;
  type: 'supply_collateral';
}

export interface WithdrawCollateralTransaction extends BaseTransaction {
  positionAddress: string;
  amount: bigint;
  type: 'withdraw_collateral';
}

export interface RepayTransaction extends BaseTransaction {
  asset: string;
  amount: bigint;
  shares: bigint;
  repayer: string;
  type: 'repay';
}

export interface SwapCollateralTransaction extends BaseTransaction {
  positionAddress: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: bigint;
  amountOut: bigint;
  type: 'swap_collateral';
}

export type Transaction = 
  | SupplyLiquidityTransaction 
  | WithdrawLiquidityTransaction 
  | BorrowDebtCrosschainTransaction 
  | SupplyCollateralTransaction
  | WithdrawCollateralTransaction
  | RepayTransaction
  | SwapCollateralTransaction;

export interface TokenInfo {
  name: string;
  symbol: string;
  logo: string;
  decimals: number;
}