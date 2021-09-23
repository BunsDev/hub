/** @jsxImportSource theme-ui **/
import { ipfsGateway } from "../../../constants";
import Dots from "../../../../public/images/dots-vertical.svg";
import styles from "./styles";

import { useMemo } from "react";
import { Flex, Themed } from "theme-ui";
import { Badge, Stars } from "components";
import { useRouter } from "hooks";
import { APIData } from "hooks/ens/useGetAPIfromENS";
import stripIPFSPrefix from "utils/stripIPFSPrefix";

type CardProps = {
  api?: APIData;
  ipfsHash?: string;
  redirectUrl?: string;
};

const Card = ({ api, ipfsHash, redirectUrl }: CardProps) => {
  const router = useRouter();
  const redirect = useMemo(
    () =>
      "info?uri=" + (ipfsHash || redirectUrl || "/ens/" + api?.pointerUris[0]),
    [ipfsHash, redirectUrl, api?.pointerUris]
  );

  return (
    <div className="Card" sx={styles.card}>
      {api && api.pointerUris && api.pointerUris.length > 0 ? (
        <a href="#" onClick={() => router.replace(redirect)}>
          <div className="wrap-contents">
            <div className="head">
              <img
                className="api-logo"
                src={`${ipfsGateway}${
                  ipfsHash || stripIPFSPrefix(api.locationUri)
                }${api.icon.replace("./", "/")}`}
              />
              <Flex className="labels">
                <Badge label="ipfs" />
                <Stars count={api.favorites} onDark large />
              </Flex>
              <Dots className="dots" />
            </div>
            <div className="body">
              <div className="row">
                <Themed.h3 className="title">{api.name}</Themed.h3>
                <div className="subtitle">{api.subtext}</div>
              </div>
            </div>
          </div>
        </a>
      ) : null}
    </div>
  );
};

export default Card;
