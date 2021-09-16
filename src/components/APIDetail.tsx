/** @jsxImportSource theme-ui **/
import { useEffect } from "react";
import { Flex, Themed, Button, Grid } from "theme-ui";
import Stars from "../components/Stars";
import { ipfsGateway, domain } from "../constants";
import { useRouter } from "next/router";
import { APIData } from "../hooks/ens/useGetAPIfromENS";
import { useStateValue } from "../state/state";
import { useAuth } from "../hooks/useAuth";
import { Styles } from "../utils/stylesInterface";

type APIDetailProps = {
  api?: APIData;
  update: () => Promise<void>;
};

const styles: Styles = {
  wrap: {
    borderRadius: "20px",
    bg: "black",
    p: ["3.75rem", "1.25rem"],
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "12px 20px 54px -6px #141316",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: [null, "column-reverse"],
    ".left": {
      flexDirection: "column",
      width: "100%",
      ".head": {
        gridTemplateColumns: ["min-content max-content", "min-content"],
        gridTemplateRows: ["min-content", "min-content min-content"],
        gridTemplateAreas: [
          `'logo title'
         'logo description'`,
          `'logo title'
         'description description'`,
        ],
        alignItems: "flex-start",
        gap: ["40px", ".75rem"],
        rowGap: "0",
        mb: ["32px", "40px"],
      },
    },
    ".right": {
      width: "100%",
      maxWidth: "300px",
      ".info-card": {
        width: [null, "100%"],
        mb: [null, "2rem"],
        ">div": {
          justifyContent: "space-between",
          alignItems: "center",
          mb: "1rem",
        },
        ">ul.links": {
          mb: ["3rem", "1.5rem"],
          "*": {
            color: "rgba(255, 255, 255, 0.5)",
            textDecoration: "none",
          },
          li: {
            display: "flex",
            fontFamily: "Nunito Sans",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: ".875rem",
            lineHeight: "120%",
            mb: "11px",
            color: "rgba(255, 255, 255, 0.5)",
            img: { maxWidth: "1rem", mr: ".5rem" },
          },
        },
        ">button": {
          backgroundColor: "white",
          color: "black",
          ml: "auto",
          width: "100%",
          p: [null, "1.25rem"],
          borderRadius: [null, "100px"],
        },
      },
    },
  },
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
            sx={{
              gridArea: `logo`,
              width: "6.25rem",
              height: "6.25rem",
              borderRadius: "20px",
            }}
          />
          <Themed.h2
            className="title"
            sx={{
              gridArea: "title",
              mb: [".75rem", "1.25rem"],
              fontSize: [null, "20px"],
            }}
          >
            {api.name}
          </Themed.h2>
          <div sx={{ gridArea: "description" }}>
            <div
              className="subtitle"
              sx={{
                color: "#FFF",
                mb: ".75rem",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {api.subtext}
            </div>
            <p
              className="description"
              sx={{
                fontSize: ".875rem",
                color: "rgba(255, 255, 255, .5)",
                mb: [null, "0"],
              }}
            >
              {api.description}
            </p>
          </div>
        </Grid>
        <Flex className="bottom">
          <div sx={{ width: "100%", maxWidth: "50rem" }}>
            <Themed.h3 sx={{ textAlign: "left" }}>Get Started</Themed.h3>
            <Themed.code>
              <Themed.pre>{`yarn install @web3api/client`}</Themed.pre>
            </Themed.code>
            <Themed.code>
              <Themed.pre sx={{ mb: [null, "0"] }}>
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
