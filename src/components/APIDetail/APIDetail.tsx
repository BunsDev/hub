/** @jsxImportSource theme-ui **/
import { ipfsGateway, domain } from "../../constants";
import styles from "./styles";

import { useEffect, useMemo } from "react";
import { Flex, Themed, Button, Grid } from "theme-ui";
import { useAuth, useStateValue, useRouter } from "hooks";
import { APIData } from "hooks/ens/useGetAPIfromENS";

type APIDetailProps = {
  api?: APIData;
  update: () => Promise<void>;
};

const APIDetail = ({ api, update }: APIDetailProps) => {
  const router = useRouter();
  const [{ dapp }] = useStateValue();
  const { authenticate } = useAuth(dapp);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleFavorite = async () => {
    if (!dapp.did) return authenticate();

    const response = await fetch(domain + "/api/apis/favorites/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userDid: dapp.did, apiId: api.id }),
    });
    const result = await response.json();

    if (result.status === 200) {
      await update();
    }
  };

  useEffect(() => {
    if (dapp.did) {
      void update();
    }
  }, [dapp.did]);

  const apiIcon = useMemo(() => {
    if (api && api.icon) {
      return `${ipfsGateway}${api.locationUri}${api.icon.replace("./", "/")}`;
    }

    return "";
  }, [ipfsGateway, api]);

  console.log({ api });
  return (
    <div className="wrap" sx={styles.wrap}>
      <Flex className="left">
        <Grid className="head">
          <img className="api-logo" src={apiIcon} />
          <Themed.h2 className="title">{api?.name}</Themed.h2>
          <div className="description-wrap">
            <div className="subtitle">{api?.subtext}</div>
            <p className="description">{api?.description}</p>
          </div>
        </Grid>
        <Flex className="body">
          <div>
            <Themed.h3>Get Started</Themed.h3>
            <Themed.code>
              <Themed.pre>{`yarn install @web3api/client`}</Themed.pre>
            </Themed.code>
            <Themed.code>
              <Themed.pre>
                {`import {
  Web3API,
  Ethereum,
  IPFS,
  Subgraph
} from "@web3api/client-js";

const api = new Web3API({
  uri: "simplestorage.eth",
  portals: {
    ethereum: new Ethereum({ provider: (window as any).ethereum }),
    ipfs: new IPFS({ provider: "http://localhost:5001" }),
    subgraph: new Subgraph({ provider: "http://localhost:8020" })
  }
})`}
              </Themed.pre>
            </Themed.code>
          </div>
        </Flex>
      </Flex>
      <Flex className="right">
        <Flex className="info-card">
          <Themed.h3 className="title">{api?.name}</Themed.h3>
          <ul className="links">
            {api &&
              "apiUris" in api &&
              api.apiUris.map((pointer, idx) => {
                return (
                  <li key={idx + "pointerURI"}>
                    <img src="/images/link.svg" alt="icon" />
                    <a href={pointer.uri} target="_BLANK" rel="noreferrer">
                      {pointer}
                    </a>
                  </li>
                );
              })}
            {api && "locationUri" in api && (
              <li>
                <img src="/images/link.svg" alt="icon" />
                <a
                  href={`${ipfsGateway}${api.locationUri}`}
                  target="_BLANK"
                  rel="noreferrer"
                >
                  {("ipfs/" + api.locationUri).substring(0, 25) + "..."}
                </a>
              </li>
            )}
          </ul>
        </Flex>
        <Button
          variant="secondaryMedium"
          onClick={() => {
            void router.push(`/query?uri=/ens/${api.apiUris[0]}`);
          }}
        >
          Open Playground
        </Button>
      </Flex>
    </div>
  );
};

export default APIDetail;
