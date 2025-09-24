import { gql } from "graphql-request";

export const queryLendingPool = () => {
  return gql`
    query MyQuery {
      lendingPoolCreateds(where: { blockNumber_gt: "35954453" }) {
        id
        lendingPool
        borrowToken
        collateralToken
        ltv
      }
    }
  `;
};

export const queryLendingPoolApy = () => {
  return gql`
    query MyQuery {
      lendingPools {
        borrowAPY
        supplyAPY
        address
      }
    }
  `;
};
