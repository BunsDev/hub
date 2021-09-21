/** @jsxImportSource theme-ui **/
import { useMemo } from "react";
import { Flex, Themed } from "theme-ui";

import {Badge, Stars} from "components";
import { ipfsGateway } from "../../../constants";
import { useRouter } from "hooks"; 
import { APIData } from "hooks/ens/useGetAPIfromENS";
import stripIPFSPrefix from "utils/stripIPFSPrefix";
import Dots from "../../../../public/images/dots-vertical.svg";

import styles from './styles'

type CardProps = {
  api?: APIData;
  ipfsHash?: string;
  boxShadowOn?: boolean;
  noHover?: boolean;
  redirectUrl?: string;
};

const Card = ({ api, ipfsHash, boxShadowOn, redirectUrl }: CardProps) => {
  const router = useRouter();

  const redirect = useMemo(
    () => ipfsHash || redirectUrl || "apis/ens/" + api?.pointerUris[0],
    [ipfsHash, redirectUrl, api?.pointerUris]
  );

  return (
    <div
      className="Card"
      sx={{
        ...styles.card,
        boxShadow: boxShadowOn
          ? "0rem 2rem 2.75rem rgba(28, 94, 93, 0.1)"
          : "none",
      }}
    >
      {api && api.pointerUris && api.pointerUris.length > 0 ? (
        <a href="#" onClick={() => router.replace(redirect)}>
          <div className="wrap-contents">
            <div>
              <img
                className="api-logo"
                src={`${ipfsGateway}${
                  ipfsHash || stripIPFSPrefix(api.locationUri)
                }${api.icon.replace("./", "/")}`}
              />
              <Flex
                sx={{ display: "flex", flexDirection: "column", gap: "14px" }}
              >
                <Badge label="ipfs" />
                <Stars count={api.favorites} onDark large />
              </Flex>
              <Dots
                sx={{ position: "absolute", top: "-4px", right: "-12px" }}
              />
            </div>
            <div className="info">
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
