import { gql } from "graphql-request";

export const GET_USER_TRANSACTIONS = gql`
  query GetUserTransactions($user: String!) {
    # Supply Liquidity
    supplyLiquidities(
      where: { user: $user }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      user {
        id
        address
      }
      pool {
        id
        address
        token0
        token1
      }
      asset
      amount
      shares
      onBehalfOf
      timestamp
      blockNumber
      transactionHash
    }

    # Withdraw Liquidity
    withdrawLiquidities(
      where: { user: $user }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      user {
        id
        address
      }
      pool {
        id
        address
        token0
        token1
      }
      asset
      amount
      shares
      to
      timestamp
      blockNumber
      transactionHash
    }

    # Supply Collateral
    supplyCollaterals(
      where: { user: $user }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      user {
        id
        address
      }
      pool {
        id
        address
        token0
        token1
      }
      asset
      amount
      onBehalfOf
      timestamp
      blockNumber
      transactionHash
    }

    # Borrow
    borrowDebtCrosschains(
      where: { user: $user }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      user {
        id
        address
      }
      pool {
        id
        address
        token0
        token1
      }
      asset
      amount
      shares
      chainId
      addExecutorLzReceiveOption
      onBehalfOf
      timestamp
      blockNumber
      transactionHash
    }

    # Withdraw Collateral
    positionWithdrawCollaterals(
      where: { user: $user }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      user {
        id
        address
      }
      positionAddress
      pool {
        id
        address
        token0
        token1
      }
      amount
      timestamp
      blockNumber
      transactionHash
    }

    # Repay
    repayWithCollateralByPositions(
      where: { user: $user }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      user {
        id
        address
      }
      pool {
        id
        address
        token0
        token1
      }
      asset
      amount
      shares
      repayer
      timestamp
      blockNumber
      transactionHash
    }

    # Swap Collateral
    positionSwapTokenByPositions(
      where: { user: $user }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      user {
        id
        address
      }
      positionAddress
      pool {
        id
        address
        token0
        token1
      }
      tokenIn
      tokenOut
      amountIn
      amountOut
      timestamp
      blockNumber
      transactionHash
    }
  }
`;

export const GET_ALL_TRANSACTIONS = gql`
  query GetAllTransactions {
    # Supply Liquidity
    supplyLiquidities(orderBy: timestamp, orderDirection: desc) {
      id
      user {
        id
        address
      }
      pool {
        id
        address
        token0
        token1
      }
      asset
      amount
      shares
      onBehalfOf
      timestamp
      blockNumber
      transactionHash
    }

    # Withdraw Liquidity
    withdrawLiquidities(orderBy: timestamp, orderDirection: desc) {
      id
      user {
        id
        address
      }
      pool {
        id
        address
        token0
        token1
      }
      asset
      amount
      shares
      to
      timestamp
      blockNumber
      transactionHash
    }

    # Supply Collateral
    supplyCollaterals(orderBy: timestamp, orderDirection: desc) {
      id
      user {
        id
        address
      }
      pool {
        id
        address
        token0
        token1
      }
      asset
      amount
      onBehalfOf
      timestamp
      blockNumber
      transactionHash
    }

    # Borrow
    borrowDebtCrosschains(orderBy: timestamp, orderDirection: desc) {
      id
      user {
        id
        address
      }
      pool {
        id
        address
        token0
        token1
      }
      asset
      amount
      shares
      chainId
      addExecutorLzReceiveOption
      onBehalfOf
      timestamp
      blockNumber
      transactionHash
    }

    # Withdraw Collateral
    positionWithdrawCollaterals(orderBy: timestamp, orderDirection: desc) {
      id
      user {
        id
        address
      }
      positionAddress
      pool {
        id
        address
        token0
        token1
      }
      amount
      timestamp
      blockNumber
      transactionHash
    }

    # Repay
    repayWithCollateralByPositions(orderBy: timestamp, orderDirection: desc) {
      id
      user {
        id
        address
      }
      pool {
        id
        address
        token0
        token1
      }
      asset
      amount
      shares
      repayer
      timestamp
      blockNumber
      transactionHash
    }

    # Swap Collateral
    positionSwapTokenByPositions(orderBy: timestamp, orderDirection: desc) {
      id
      user {
        id
        address
      }
      positionAddress
      pool {
        id
        address
        token0
        token1
      }
      tokenIn
      tokenOut
      amountIn
      amountOut
      timestamp
      blockNumber
      transactionHash
    }
  }
`;

interface UserObject {
  id: string;
  address: string;
}

interface PoolObject {
  id: string;
  address: string;
  token0: string;
  token1: string;
}

export interface GraphQLTransactionResponse {
  supplyLiquidities: Array<{
    id: string;
    user: UserObject;
    pool: PoolObject;
    asset: string;
    amount: string;
    shares: string;
    onBehalfOf: string;
    timestamp: string;
    blockNumber: string;
    transactionHash: string;
  }>;
  withdrawLiquidities: Array<{
    id: string;
    user: UserObject;
    pool: PoolObject;
    asset: string;
    amount: string;
    shares: string;
    to: string;
    timestamp: string;
    blockNumber: string;
    transactionHash: string;
  }>;
  supplyCollaterals: Array<{
    id: string;
    user: UserObject;
    pool: PoolObject;
    asset: string;
    amount: string;
    onBehalfOf: string;
    timestamp: string;
    blockNumber: string;
    transactionHash: string;
  }>;
  borrowDebtCrosschains: Array<{
    id: string;
    user: UserObject;
    pool: PoolObject;
    asset: string;
    amount: string;
    shares: string;
    chainId: string;
    addExecutorLzReceiveOption: string;
    onBehalfOf: string;
    timestamp: string;
    blockNumber: string;
    transactionHash: string;
  }>;
  positionWithdrawCollaterals: Array<{
    id: string;
    user: UserObject;
    positionAddress: string;
    pool: PoolObject;
    amount: string;
    timestamp: string;
    blockNumber: string;
    transactionHash: string;
  }>;
  repayWithCollateralByPositions: Array<{
    id: string;
    user: UserObject;
    pool: PoolObject;
    asset: string;
    amount: string;
    shares: string;
    repayer: string;
    timestamp: string;
    blockNumber: string;
    transactionHash: string;
  }>;
  positionSwapTokenByPositions: Array<{
    id: string;
    user: UserObject;
    positionAddress: string;
    pool: PoolObject;
    tokenIn: string;
    tokenOut: string;
    amountIn: string;
    amountOut: string;
    timestamp: string;
    blockNumber: string;
    transactionHash: string;
  }>;
}
