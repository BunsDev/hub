import { DID } from "dids";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import KeyDidResolver from "key-did-resolver";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import Ceramic from "@ceramicnetwork/http-client";
import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { JsonRpcProvider } from "@web3api/client-js/build/pluginConfigs/Ethereum";
import { IDX } from "@ceramicstudio/idx";
import { useStateValue } from "src/state/state";
import { FavortitesProvider } from "./useFavorites";

const aliases = {
  authentication:
    "kjzl6cwe1jw148u82hnzcxx40jmyv4rkssid4rlhz7mku1rpxtnvf4nu9z2loup",
  favorites: "kjzl6cwe1jw14a0t4tt61bsk9a0nt07txma6ra5bkccacfmcpvi9weiuprp7n8r",
};

const CERAMIC_NODE =
  process.env.CERAMIC_NODE || "https://ceramic-clay.3boxlabs.com";

type CeramicContextValue = { idx: IDX };

export const CeramicContext = createContext<CeramicContextValue>({ idx: null });

export const CeramicProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<{ idx: IDX }>({ idx: null });
  const [{ dapp }] = useStateValue();

  const connect = useCallback(
    async ({ provider }: { provider: JsonRpcProvider }) => {
      try {
        const ceramic = new Ceramic(CERAMIC_NODE);

        const resolver = {
          ...KeyDidResolver.getResolver(),
          ...ThreeIdResolver.getResolver(ceramic),
        };

        const did = new DID({ resolver });
        await ceramic.setDID(did);

        const authProvider = new EthereumAuthProvider(
          provider,
          provider.selectedAddress
        );

        const threeIdConnect = new ThreeIdConnect();

        await threeIdConnect.connect(authProvider);

        const didProvider = threeIdConnect.getDidProvider();
        ceramic.did.setProvider(didProvider);
        await ceramic.did.authenticate();

        const idx = new IDX({ ceramic: ceramic, aliases });
        setState({ idx });
      } catch (e) {
        console.log("Error doing the connection of ceramic ", e);
      }
    },
    [dapp.web3, dapp.address]
  );

  useEffect(() => {
    if (dapp.web3 && dapp.address) {
      //@ts-ignore
      void connect(dapp.web3);
    }
  }, [dapp.web3, dapp.address]);

  return (
    <CeramicContext.Provider value={state}>
      <FavortitesProvider idx={state.idx}>{children}</FavortitesProvider>
    </CeramicContext.Provider>
  );
};

export const useCeramic = () => useContext(CeramicContext); // eslint-disable-line