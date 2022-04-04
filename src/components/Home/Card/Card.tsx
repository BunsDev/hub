/** @jsxImportSource theme-ui **/
import { Flex, Themed } from "theme-ui";
import Link from "next/link";

import { Badge, Stars } from "components";
import { APIData } from "hooks/ens/useGetAPIfromENS";
import Favorite from "../../../../public/images/favorite.svg";

import styles from "./styles";
import { useCallback, useMemo } from "react";
import { useStateValue } from "hooks";
import { getApiImgLocation, resolveApiLocation } from "utils/pathResolvers";
import useModal from "hooks/useModal";
import { useCeramic } from "hooks/useCeramic";
import { useFavorites } from "hooks/useFavorites";

type CardProps = {
  api?: APIData;
};

const Card = ({ api }: CardProps) => {
  const [{ dapp }] = useStateValue();

  const { idx } = useCeramic();
  const { getSuccess, toggleFavorite } = useFavorites();

  const ens = useMemo(() => {
    return api.apiUris.find((uri) => uri.uriTypeId === "1");
  }, [api]);

  const handleFavorite = useCallback(async () => {
    if (dapp.address && idx) {
      toggleFavorite(api);
    } else if (dapp.address && !idx) {
      return;
    } else {
      openModal();
    }
  }, [dapp.favorites, dapp.address, idx]);

  const { openModal } = useModal("useFeature", { onClose: handleFavorite });

  const isFavorite = useMemo(
    () => dapp.favoritesList[api.locationUri],
    [dapp.favoritesList]
  );

  const redirectUrl = useMemo(
    () => `/info?uri=${resolveApiLocation(api)}`,
    [api]
  );
  const imgLocation = getApiImgLocation(api)

  return (
    <div className="Card" sx={styles.card}>
      {api && (
        <Link href={redirectUrl || "/"} shallow>
          <a
            onClick={(e) => {
              //@ts-ignore
              if (e.target.tagName === "path" || e.target.tagName === "svg") {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }
              return false;
            }}
          >
            <div className="wrap-contents">
              <div className="head">
                <div className="logo-wrap">
                  {imgLocation && <img className="api-logo" src={imgLocation} />}
                </div>
                <Flex className="labels">
                  <Badge label={ens ? "ens" : "ipfs"} />
                  <Stars count={api.favorites} onDark large />
                </Flex>
                {
                  <Favorite
                    onClick={handleFavorite}
                    className={`favorite${isFavorite ? " active" : ""}${
                      !idx?.authenticated || !dapp.address || !getSuccess
                        ? " pending"
                        : ""
                    }`}
                  />
                }
              </div>
              <div className="body">
                <div className="row">
                  <Themed.h3 className="title">{api.name}</Themed.h3>
                  <div className="subtitle">{api.subtext}</div>
                </div>
              </div>
            </div>
          </a>
        </Link>
      )}
    </div>
  );
};

export default Card;
