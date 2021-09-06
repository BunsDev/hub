/** @jsxImportSource theme-ui **/

import { CreateApiContext } from "../../pages/apis/create";
import { createApiSteps, UPLOAD_METHODS } from "../../utils/createWrapper";

import { useRouter } from "next/router";
import { useCallback, useContext } from "react";
import { Button, Flex, Themed, ThemeUICSSObject } from "theme-ui";

const styles: { [key: string]: ThemeUICSSObject } = {
  tutorial: {
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "1.25rem",
    justifyContent: "space-between",
    gap: "1.875rem",
    p: "1.75rem 2rem",
    mb: "2rem",
    div: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      "span, a": {
        color: "rgba(255, 255, 255, 0.5)",
        fontSize: "0.875rem",
        lineHeight: "120%",
        m: 0,
      },
      li: {
        mb: ".5rem",
        img: { maxWidth: "1rem", mr: ".5rem" },
        a: { display: "flex", alignItems: "center" },
        "&:last-child": { mb: 0 },
      },
      code: {
        mt: ".25rem",
      },
      pre: {
        m: "0",
        p: "0",
        bg: "transparent",
      },
    },
  },
};

const Start = () => {
  const router = useRouter();

  const { setUploadMethod } = useContext(CreateApiContext);

  const handleMethodSelection = useCallback((method: string) => {
    setUploadMethod(method);
    void router.push(
      router.pathname + `?activeTab=${createApiSteps[1]}&method=${method}`
    );
  }, []);

  return (
    <Flex
      className="create"
      sx={{
        flexDirection: "column",
      }}
    >
      <div sx={{ mb: "1.75rem" }} className="body-1">
        Choose one of creating options
      </div>
      <Flex className="tutorial" sx={styles["tutorial"]}>
        <div>
          <ul>
            <li>
              <a
                href="https://github.com/Web3Api/boilerplate"
                target="_BLANK"
                rel="noreferrer"
              >
                <img src="/images/link.svg" alt="icon" />
                Starter Repo
              </a>
            </li>
            <li>
              <a href="/" target="_BLANK">
                <img src="/images/link.svg" alt="icon" />
                First time developing with Web3API?
              </a>
            </li>
          </ul>
        </div>
        <div>
          <span sx={{ mb: 2 }}>
            Clone the starter repo to your local dev environment
          </span>
          <code>
            <pre>
              {`git clone https://github.com/web3api-start/uniswapv2 
cd uniswapv2
yarn install`}
            </pre>
          </code>
        </div>
        <div>
          <span>When ready deploy the package to IPFS using the following</span>
          <Themed.code>
            <Themed.pre>{`yarn codegen
yarn build
yarn deploy --IPFS`}</Themed.pre>
          </Themed.code>
        </div>
      </Flex>
      <Flex
        className="options"
        sx={{
          mb: "2.5rem",
          gap: "1rem",
          div: {
            maxWidth: "14,1875rem",
            width: "100%",
            p: "1.75rem",
            background: "#0F0F0F",
            borderRadius: "20px",
            transition: ".2s background",
            "&:hover": {
              cursor: "pointer",
              background: "#141D32",
            },
          },
        }}
      >
        <div
          onClick={() => handleMethodSelection(UPLOAD_METHODS.DIRECT_UPLOAD)}
        >
          <Themed.h3>Direct Upload</Themed.h3>
          <p className="body-1">
            Drag and drop (input for file upload) -{">"} system upload to ipfs -
            {">"} create ENS record (input to ask ens name) (metamask)
          </p>
        </div>
        <div onClick={() => handleMethodSelection(UPLOAD_METHODS.ENS_ADDRESS)}>
          <Themed.h3>Provide ENS Address</Themed.h3>
          <p className="body-1">
            (input for ENS) -{">"} system get ipfs hash from ENS
          </p>
        </div>
        <div onClick={() => handleMethodSelection(UPLOAD_METHODS.IPFS_HASH)}>
          <Themed.h3>Provide IPFS Hash</Themed.h3>
          <p className="body-1">
            (input for ipfs) -{">"} ask &quot;would you like to create ENS&quot;
          </p>
        </div>
      </Flex>
      <Flex className="buttons">
        <Button
          variant="secondaryMedium"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

export default Start;
