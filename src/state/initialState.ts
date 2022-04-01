import { networkID } from "../constants";
import { APIData, APIDataFromManifest } from "../hooks/ens/useGetAPIfromENS";

import ethers from "ethers";
import { PluginRegistration, UriRedirect } from "@web3api/client-js";
import { ethereumPlugin } from "@web3api/ethereum-plugin-js";
import { Favorites } from "services/ceramic/handlers";
import { API } from "bnc-onboard/dist/src/interfaces";

export interface State {
  dapp: DappType;
  web3api: {
    plugins: PluginRegistration[];
  };
  publish: PublishType;
  search: SearchType;
}
export const defaultPlugins = [
  {
    uri: "ens/ethereum.web3api.eth",
    plugin: ethereumPlugin({
      networks: {
        mainnet: {
          provider:
            "https://mainnet.infura.io/v3/b00b2c2cc09c487685e9fb061256d6a6",
        },
      },
    }),
  },
];

export const initialState: State = {
  dapp: {
    balance: "-1",
    address: undefined,
    wallet: {
      name: "TEST",
    },
    network: networkID,
    web3: undefined,
    onboard: undefined,
    apis: { items: [], total: null },
    apisLoading: true,
    github: "",
    did: undefined,
    favorites: { ens: [], ipfs: [] },
    favoritesList: {},
  },
  web3api: {
    plugins: [...defaultPlugins],
  },
  publish: {
    subdomain: "",
    ipfs: "",
    subdomainError: "",
    subdomainLookupSuccess: false,
    subdomainRegisterSuccess: false,
    subdomainLoading: false,
    ipfsLoading: false,
    ipfsError: "",
    ipfsSuccess: false,
    showConnectModal: false,
    showSignInModal: false,
    showSuccessModal: false,
    apiData: undefined,
    registrationStatus: -1,
  },
  search: {
    sortedApi: [],
  },
};

type DappType = {
  balance: string;
  address: string;
  wallet: { name: string };
  network: number;
  web3?: ethers.providers.JsonRpcProvider;
  onboard?: API;
  apis: { items: APIData[]; total: number };
  apisLoading: boolean;
  github?: string;
  did?: string;
  favorites?: Favorites;
  favoritesList?: { [key: string]: boolean };
};

type Web3apiType = {
  redirects: UriRedirect[];
};

type PublishType = {
  subdomain: string;
  ipfs: string;
  subdomainError: string;
  subdomainLookupSuccess: boolean;
  subdomainRegisterSuccess: boolean;
  subdomainLoading: boolean;
  ipfsLoading: boolean;
  ipfsError: string;
  ipfsSuccess: boolean;
  showConnectModal: boolean;
  showSignInModal: boolean;
  showSuccessModal: boolean;
  apiData: APIDataFromManifest;
  registrationStatus: number;
};

type SearchType = {
  sortedApi: -1 | APIData[];
};

export default initialState;
export type { DappType };
export type { Web3apiType };
export type { PublishType };
export type { SearchType };
