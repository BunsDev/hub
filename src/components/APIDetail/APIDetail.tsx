/** @jsxImportSource theme-ui **/
import { useEffect } from "react";
import { Flex, Themed, Button, Grid } from "theme-ui";

import { ipfsGateway, domain } from "../../constants";
import { useAuth, useStateValue, useRouter } from "hooks";
import { APIData } from "hooks/ens/useGetAPIfromENS";

import styles from "./styles";

type APIDetailProps = {
  api?: APIData;
  update: () => Promise<void>;
};

const APIDetail = ({ api, update }: APIDetailProps) => {
  const router = useRouter();
  const [{ dapp }] = useStateValue();
  const { authenticate } = useAuth(dapp);

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

  return (
    <div className="wrap" sx={styles.wrap}>
      <Flex className="left">
        <Grid className="head">
          <img
            className="api-logo"
            src={`${ipfsGateway}${api.locationUri}${api.icon.replace(
              "./",
              "/"
            )}`}
          />
          <Themed.h2 className="title">{api.name}</Themed.h2>
          <div className="description-wrap">
            <div className="subtitle">{api.subtext}</div>
            <p className="description">{api.description}</p>
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
        <div className="info-card">
          <Flex>
            <Themed.h3 className="title">{api.name}</Themed.h3>
          </Flex>
          <ul className="links">
            {"pointerUris" in api &&
              api.pointerUris.map((pointer, idx) => {
                return (
                  <li key={idx + "pointerURI"}>
                    <img src="/images/link.svg" alt="icon" />
                    <a href={pointer} target="_BLANK" rel="noreferrer">
                      {pointer}
                    </a>
                  </li>
                );
              })}
            {"locationUri" in api && (
              <li>
                <img src="/images/link.svg" alt="icon" />
                <a href={`${ipfsGateway}${api.locationUri}`} target="_BLANK">
                  {("ipfs/" + api.locationUri).substring(0, 25) + "..."}
                </a>
              </li>
            )}
          </ul>
          <Button
            variant="secondaryMedium"
            onClick={() => {
              void router.push(`/playground/ens/${api.pointerUris[0]}`);
            }}
          >
            Open Playground
          </Button>
        </div>
      </Flex>
    </div>
  );
};

export default APIDetail;
