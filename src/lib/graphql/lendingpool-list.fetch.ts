import { graphClient } from "./client";
import { queryLendingPool } from "./lendingpool-data.query";
import { tokens } from "../addresses/tokenAddress";
import { Token } from "@/types";
import { normalizeAddress } from "@/utils/address";

export type LendingPoolCreated = {
  id: string;
  lendingPool: `0x${string}`;
  borrowToken: `0x${string}`;
  collateralToken: `0x${string}`;
  ltv: string;
};

export type LendingPoolWithTokens = LendingPoolCreated & {
  borrowTokenInfo: Token | null;
  collateralTokenInfo: Token | null;
};

// Helper function to find token by address
function findTokenByAddress(address: string, chainId?: number): Token | null {
  const normalizedAddress = normalizeAddress(address);
  
  if (!normalizedAddress) {
    return null;
  }
  
  // If chainId is provided, search only in that chain
  if (chainId) {
    return tokens.find(token => {
      const tokenAddress = normalizeAddress(token.addresses[chainId]);
      return tokenAddress === normalizedAddress;
    }) || null;
  }
  
  // If no chainId provided, search across all chains
  return tokens.find(token => {
    return Object.values(token.addresses).some(addr => 
      normalizeAddress(addr) === normalizedAddress
    );
  }) || null;
}

// Function to pair lending pools with token metadata
export function pairLendingPoolsWithTokens(pools: LendingPoolCreated[], chainId?: number): LendingPoolWithTokens[] {
  return pools.map(pool => ({
    ...pool,
    borrowTokenInfo: findTokenByAddress(pool.borrowToken, chainId),
    collateralTokenInfo: findTokenByAddress(pool.collateralToken, chainId),
  }));
}

export async function fetchLendingPools(): Promise<LendingPoolCreated[]> {
  try {
    const query = queryLendingPool();
    const data = await graphClient.request<{ lendingPoolCreateds: LendingPoolCreated[] }>(query);
    
    if (!data?.lendingPoolCreateds) {
      return [];
    }
    
    const pools = data.lendingPoolCreateds;

    if (!Array.isArray(pools)) {
      return [];
    }

    // Filter out invalid pools
    const validPools = pools.filter(pool => 
      pool.lendingPool && 
      pool.borrowToken && 
      pool.collateralToken
    );
    
    return validPools;
  } catch (error) {
    console.error('Error fetching lending pools:', error);
    return [];
  }
}              