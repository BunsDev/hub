interface Network {
  name: keyof typeof SupportedNetworks;
  node: string;
  explorer: string;
}
//export type SupportedNetworks = "mainnet" | "ropsten" | "rinkeby";

export enum SupportedNetworks {
  "mainnet",
  "ropsten",
  "rinkeby",
}

const INFURA_KEY =
  process.env.INFURA_API_KEY || "b76cba91dc954ceebff27244923224b1";

export const networks: Record<string, Network> = {
  "1": {
    name: "mainnet",
    node: "https://mainnet.infura.io/v3/" + INFURA_KEY,
    explorer: "https://etherscan.io",
  },
  "3": {
    name: "ropsten",
    node: "https://ropsten.infura.io/v3/" + INFURA_KEY,
    explorer: "https://ropsten.etherscan.io",
  },
  "4": {
    name: "rinkeby",
    node: "https://rinkeby.infura.io/v3/" + INFURA_KEY,
    explorer: "https://rinkeby.etherscan.io",
  },
};
