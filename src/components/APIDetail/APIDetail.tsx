/** @jsxImportSource theme-ui **/
import { ipfsGateway, API_URI_TYPE_ID } from "../../constants";
import styles from "./styles";
import { useCallback, useEffect, useMemo } from "react";
import { Flex, Themed, Button, Grid } from "theme-ui";
import { useStateValue, useRouter } from "hooks";
import { APIData } from "hooks/ens/useGetAPIfromENS";
import { getApiImgLocation } from "utils/pathResolvers";
import Favorite from "../../../public/images/favorite.svg";
import Auth from "services/ceramic/auth";
import useModal from "hooks/useModal";
import { useCeramic } from "hooks/useCeramic";
import { useFavorites } from "hooks/useFavorites";

type APIDetailProps = {
  api?: APIData;
  update: () => Promise<void>;
};

const APIDetail = ({ api, update }: APIDetailProps) => {
  const router = useRouter();
  const [{ dapp }] = useStateValue();

  const { idx } = useCeramic();
  const { toggleFavorite } = useFavorites();

  const isFavorite = useMemo(
    () => dapp.favoritesList[api.locationUri],
    [dapp.favoritesList]
  );

  const handleFavorite = useCallback(async () => {
    if (dapp.address && Auth.ceramic.did?.authenticated) {
      toggleFavorite(api);
    } else if (dapp.address && !Auth.ceramic?.did?.authenticated) {
      return;
    } else {
      openModal();
    }
  }, [dapp.favorites]);

  const { openModal } = useModal("connect", { onClose: handleFavorite });

  useEffect(() => {
    if (dapp.did) {
      void update();
    }
  }, [dapp.did]);

  const apiIcon = useMemo(() => {
    if (api && api.icon) {
      return getApiImgLocation(api);
    }

    return "";
  }, [ipfsGateway, api]);

  return (
    <div className="wrap" sx={styles.wrap}>
      <Flex className="left">
        <Grid className="head">
          <img className="api-logo" src={apiIcon} />
          <Themed.h2 className="title">
            {api?.name}{" "}
            {
              <Favorite
                onClick={handleFavorite}
                className={`favorite${isFavorite ? " active" : ""}${
                  !idx.authenticated || !dapp.address ? " pending" : ""
                }`}
              />
            }
          </Themed.h2>
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
                      {API_URI_TYPE_ID[pointer.uriTypeId]}/{pointer.uri}
                    </a>
                  </li>
                );
              })}
            {api && "locationUri" in api && (
              <li>
                <img src="/images/link.svg" alt="icon" />
                <a
                  //@ts-ignore TODO remove this block after no locationUri
                  href={`${ipfsGateway}${api?.locationUri}`}
                  target="_BLANK"
                  rel="noreferrer"
                >
                  {(
                    "ipfs/" +
                    //@ts-ignore
                    api.locationUri
                  ).substring(0, 25) + "..."}
                </a>
              </li>
            )}
          </ul>
        </Flex>
        <Button
          variant="secondaryMedium"
          onClick={() => {
            void router.push(`/query?uri=${router.query?.uri}`);
          }}
        >
          Open Playground
        </Button>
      </Flex>
    </div>
  );
};

export default APIDetail;
