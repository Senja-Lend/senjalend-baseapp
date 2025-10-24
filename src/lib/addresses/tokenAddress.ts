import { Token } from "@/types";

export const tokens: Token[] = [
  {
    name: "WETH",
    symbol: "WETH",
    logo: "/token/weth.png",
    decimals: 18,
    oftAddress: "0x08F17aC3389f8A719602681747F668fa4EFdBbAb",
    addresses: {
      8453: "0x4200000000000000000000000000000000000006", //weth
      42161: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", //weth
    },
  },
  {
    name: "WBTC",
    symbol: "WBTC",
    logo: "/token/wbtc.png",
    decimals: 8,
    oftAddress: "0x7bFA71D5f8A3BfA35384E14863E299Ef20B2652a",
    addresses: {
      8453: "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c", //wbtc
      42161: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f", //wbtc
    },
  },
  {
    name: "USDT",
    symbol: "USDT",
    logo: "/token/usdt.png",
    decimals: 6,
    oftAddress: "0x90a07246df6cc23C26343Fc4595aC71e834dcfd3",
    addresses: {
      8453: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2", //usdt
      42161: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", // usdt
    },
  },
  {
    name: "USDC",
    symbol: "USDC",
    logo: "/token/usdc.png",
    decimals: 6,
    oftAddress: "0x4DbfE8f6a12E3538e4F2B3712ec81cD7A161e3bd",
    addresses: {
      8453: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", //usdc
      42161: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // usdc
    },
  },
];

export const helperAddress = "0x8a0AB3999e64942E3A0A3227a5914319A7788253";
