import { networkID } from "../constants";
import { APIData } from "../hooks/ens/useGetAPIfromENS";

import ethers from "ethers";
import { PluginRegistration, UriRedirect } from "@web3api/client-js";
import { ethereumPlugin } from "@web3api/ethereum-plugin-js";

export interface State {
  dapp: DappType;
  web3api: {
    plugins: PluginRegistration[];
  };
  publish: PublishType;
  search: SearchType;
  mobile: MobileType;
}

export const initialState: State = {
  dapp: {
    balance: "-1",
    address: undefined,
    wallet: {
      name: "TEST",
    },
    network: networkID,
    web3: undefined,
    apis: [],
    github: "",
    did: undefined,
  },
  web3api: {
    plugins: [
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
    ],
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
  mobile: {
    isMobile: false,
    isMobileNavActive: false,
  },
};

type DappType = {
  balance: string;
  address: string;
  wallet: { name: string };
  network: number;
  web3?: ethers.providers.JsonRpcProvider;
  apis: APIData[];
  github?: string;
  did?: string;
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
  apiData: APIData | undefined;
  registrationStatus: number;
};

type SearchType = {
  sortedApi: -1 | APIData[];
};
type MobileType = {
  isMobile: boolean;
  isMobileNavActive: boolean;
};

export default initialState;
export type { DappType };
export type { Web3apiType };
export type { PublishType };
export type { SearchType };
export type { MobileType };
