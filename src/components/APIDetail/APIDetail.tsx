/** @jsxImportSource theme-ui **/
import { ipfsGateway, API_URI_TYPE_ID } from "../../constants";
import styles from "./styles";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Flex, Themed, Button, Grid } from "theme-ui";
import { useStateValue, useRouter } from "hooks";
import { APIData } from "hooks/ens/useGetAPIfromENS";
import { getApiImgLocation } from "utils/pathResolvers";
import Favorite from "../../../public/images/favorite.svg";
import useModal from "hooks/useModal";
import { useCeramic } from "hooks/useCeramic";
import { useFavorites } from "hooks/useFavorites";
import { useWeb3ApiClient } from "@web3api/react";
import dynamic from "next/dynamic";
import Spinner from "components/common/Spinner";
import { getDefaultDocsNode, getExampleQueryNode } from "./docNodes";
import { useLoading } from "hooks/useLoading";
import { getExampleQuery, getReadme } from "utils/getFile";

const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false });

type APIDetailProps = {
  api?: APIData;
};

const APIDetail = ({ api }: APIDetailProps) => {
  const router = useRouter();
  const [{ dapp }] = useStateValue();

  const { idx } = useCeramic();
  const { toggleFavorite } = useFavorites();

  const [docs, setDocs] = useState({
    loading: true,
    content: undefined,
    error: "",
  });
  const withLoading = useLoading(docs.loading);
  const client = useWeb3ApiClient();

  const isFavorite = useMemo(
    () => dapp.favoritesList[api.locationUri],
    [dapp.favoritesList]
  );

  const handleFavorite = useCallback(async () => {
    if (dapp.address && idx?.authenticated) {
      toggleFavorite(api);
    } else if (dapp.address && !idx?.authenticated) {
      return;
    } else {
      openModal();
    }
  }, [dapp.favorites]);

  const { openModal } = useModal("useFeature", { onClose: handleFavorite });

  const apiLocation = useMemo(() => "ipfs/" + api?.locationUri, [api]);

  useEffect(() => {
    const loadDocs = async () => {
      const readmeBuffer = await getReadme(client, apiLocation);
      if (readmeBuffer) {
        setDocs((docs) => ({
          ...docs,
          loading: false,
          content: (
            <ReactMarkdown
              children={readmeBuffer.toString()}
              className="markdown"
            />
          ),
        }));
      } else {
        const exampleQuery = await getExampleQuery(client, apiLocation);
        if (exampleQuery) {
          const { query, vars } = exampleQuery;
          setDocs((docs) => ({
            ...docs,
            loading: false,
            content: getDefaultDocsNode(
              apiLocation,
              getExampleQueryNode(vars, query)
            ),
          }));
        } else {
          setDocs({
            loading: false,
            content: getDefaultDocsNode(apiLocation),
            error: "",
          });
        }
      }
    };
    if (api) {
      loadDocs();
    }
  }, []);

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
          <div className="logo-wrap">
            <img className="api-logo" src={apiIcon} />
          </div>
          <Themed.h2 className="title">
            {api?.name}{" "}
            {
              <Favorite
                onClick={handleFavorite}
                className={`favorite${isFavorite ? " active" : ""}${
                  !idx?.authenticated || !dapp.address ? " pending" : ""
                }`}
              />
            }
          </Themed.h2>
          <div className="description-wrap">
            <div className="subtitle">{api?.subtext}</div>
            <p className="description">{api?.description}</p>
          </div>
        </Grid>
        <Flex className="body">{withLoading(docs.content)}</Flex>
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
                    <span>
                      {API_URI_TYPE_ID[pointer.uriTypeId]}/{pointer.uri}
                    </span>
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
            void router.push(`/query?uri=${router.query?.uri}`, undefined, {
              shallow: true,
            });
          }}
        >
          Open Playground
        </Button>
      </Flex>
    </div>
  );
};

export default APIDetail;
