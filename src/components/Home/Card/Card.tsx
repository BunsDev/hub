/** @jsxImportSource theme-ui **/
import { Flex, Themed } from "theme-ui";
import Link from "next/link";

import { Badge, Stars } from "components";
import { APIData } from "hooks/ens/useGetAPIfromENS";
import Favorite from "../../../../public/images/favorite.svg";

import styles from "./styles";
import { useCallback, useMemo } from "react";
import { toggleFavorite } from "services/ceramic/handlers";
import { useStateValue } from "hooks";
import { getApiImgLocation, resolveApiLocation } from "utils/pathResolvers";
import Auth from "services/ceramic/auth";
import useModal from "hooks/useModal";

type CardProps = {
  api?: APIData;
};

const Card = ({ api }: CardProps) => {
  const [{ dapp }, dispatch] = useStateValue();

  const ens = useMemo(() => {
    return api.apiUris.find((uri) => uri.uriTypeId === "1");
  }, [api]);

  const handleFavorite = useCallback(async () => {
    if (dapp.address && Auth.ceramic.did?.authenticated) {
      toggleFavorite(api, dapp.favorites, dispatch);
    } else if (dapp.address && !Auth.ceramic?.did?.authenticated) {
      return;
    } else {
      openModal();
    }
  }, [dapp.favorites, dapp.address]);

  const { openModal } = useModal("connect", { onClose: handleFavorite });

  const isFavorite = useMemo(
    () => dapp.favoritesList[api.locationUri],
    [dapp.favoritesList]
  );

  const redirectUrl = useMemo(() => `/info?uri=${resolveApiLocation(api)}`, []);

  return (
    <div className="Card" sx={styles.card}>
      {api && (
        <Link href={redirectUrl || "/"}>
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
                <img className="api-logo" src={getApiImgLocation(api)} />
                <Flex className="labels">
                  <Badge label={ens ? "ens" : "ipfs"} />
                  <Stars count={api.favorites} onDark large />
                </Flex>
                {
                  <Favorite
                    onClick={handleFavorite}
                    className={`favorite${isFavorite ? " active" : ""}${
                      !Auth.ceramic.did?.authenticated || !dapp.address ? " pending" : ""
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
