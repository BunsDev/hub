import { networkID as defaultNetworkID } from "../constants";
interface Network {
  name: keyof typeof SupportedNetwork;
  node: string;
  explorer: string;
}
//export type SupportedNetworks = "mainnet" | "ropsten" | "rinkeby";

export enum SupportedNetwork {
  "mainnet" = 1,
  "ropsten" = 3,
  "rinkeby" = 4,
}

const INFURA_KEY =
  process.env.INFURA_API_KEY || "b76cba91dc954ceebff27244923224b1";

export const networks: Record<SupportedNetwork, Network> = {
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

export const getCurrentNetworkId = () => {
  if (typeof window !== "undefined") {
    //@ts-ignore
    return typeof window.ethereum !== "undefined"
      ? //@ts-ignore
        window.ethereum.networkVersion
      : defaultNetworkID;
  }
};
