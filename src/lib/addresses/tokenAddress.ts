import { Token } from "@/types";

export const tokens: Token[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    logo: "/token/ethereum.png",
    decimals: 18,
    oftAddress: "0x15858A57854BBf0DF60A737811d50e1Ee785f9bc",
    addresses: {
      8453: "0x0000000000000000000000000000000000000001",
      10: "0x0000000000000000000000000000000000000001",
    },
  },
  {
    name: "WETH",
    symbol: "WETH",
    logo: "/token/weth.png",
    decimals: 18,
    oftAddress: "0x007F735Fd070DeD4B0B58D430c392Ff0190eC20F", 
    addresses: {
      8453: "0x35487f37efb8F27f70e3A8Db62d04C1edfB69aE1",// mockWeth 0x4200000000000000000000000000000000000006 weth
      10: "0x3870bFD5820994a560E3F1D9c98c7740D9E007B8", //mockWeth 0x4200000000000000000000000000000000000006 weth
    },
  },
  {
    name: "WBTC",
    symbol: "WBTC",
    logo: "/token/wbtc.png",
    decimals: 8,
    oftAddress: "0x4Ba8D8083e7F3652CCB084C32652e68566E9Ef23",
    addresses: {
      8453: "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c", //wbtc
      10: "0x68f180fcCe6836688e9084f035309E29Bf0A2095", //wbtc
    },
  },
  {
    name: "USDT",
    symbol: "USDT",
    logo: "/token/usdt.png",
    decimals: 6,
    oftAddress: "0xdF05e9AbF64dA281B3cBd8aC3581022eC4841FB2",
    addresses: {
      8453: "0x9fc9E6332a4eD0b5a5C24602A0821A0e44189681", //mock usdt 0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2 usdt
      10: "0x6A58615739b0FC710E6A380E893E672968E30B5F", //mock usdt 0x94b008aA00579c1307B0EF2c499aD98a8ce58e58 usdt
    },
  },
  {
    name: "USDC",
    symbol: "USDC",
    logo: "/token/usdc.png",
    decimals: 6,
    oftAddress: "0xdF05e9AbF64dA281B3cBd8aC3581022eC4841FB2",
    addresses: {
      8453: "0x735886f4EE69FFe3c7a156e8584B46748eDdB388", //mock usdc 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 usdc
      10: "0xfBC915dc39654b52B2E9284FB966C79A1071eA3A",
    },
  },
];

export const helperAddress = "0xad15249b77d9Bf9a02401b8122FC763fD7391329";
