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
    flexWrap: "wrap",
    gap: ["1.875rem", "1.25rem"],
    p: ["0 84px 26px 49px", "12px 46px 40px"],
    div: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      height: "110px",
      maxWidth: "192px",
      span: {
        mb: ".5rem",
      },
      a: {
        display: "flex",
        alignItems: "center",
        gap: ".5rem",
        fontSize: "14px",
        lineHeight: "120%",
        textDecorationLine: "underline",
        color: "rgba(255, 255, 255, 0.5)",
      },
      p: {
        fontSize: "14px",
        lineHeight: "120%",
        color: "rgba(255, 255, 255, 0.5)",
        m: "0",
        textAlign: "center",
      },
      ".subtitle-1": {
        color: "white",
      },
    },
  },
  bgText: {
    pointerEvents: "none",
    position: "absolute",
    bottom: 0,
    left: "auto",
    fontWeight: "bold",
    fontSize: "110px",
    lineHeight: "100%",
    color: "rgba(255, 255, 255, 0.1)",
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
      <Flex className="tutorial" sx={styles["tutorial"]}>
        <div sx={{ width: "fit-content" }}>
          <div className="bg" sx={styles.bgText}>
            One
          </div>
          <span className="subtitle-1">What is Polywrap ?</span>
          <a href="https://docs.polywrap.io/" target="_BLANK" rel="noreferrer">
            <img src="/images/link.svg" alt="icon" />
            Read about Polywrap
          </a>
        </div>
        <div>
          <div className="bg" sx={styles.bgText}>
            Two
          </div>
          <span className="subtitle-1">Creating a Wrapper</span>
          <a
            href="https://docs.polywrap.io/guides/create-as-wrapper/project-setup/"
            target="_BLANK"
            rel="noreferrer"
          >
            <img src="/images/link.svg" alt="icon" />
            How to create a Wrapper
          </a>
        </div>
        <div>
          <div className="bg" sx={styles.bgText}>
            Three
          </div>
          <span className="subtitle-1">Upload a Wrapper</span>
          <p>Choose one of the options below to upload your wrapper</p>
        </div>
      </Flex>
      <div
        className="arrow"
        sx={{
          width: ".75rem",
          height: ".75rem",
          border: "2px solid #FFFFFF",
          borderTop: "none",
          borderRight: "none",
          transform: "rotate(-45deg)",
          my: ["20px", "23px"],
          mx: "auto",
        }}
      />
      <Flex
        className="options"
        sx={{
          mb: ["2.5rem", "3.75rem"],
          gap: "1rem",
          flexWrap: [null, "wrap"],
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
          sx={{
            width: [null, "100%"],
            justifyContent: "center",
            py: [null, "1.25rem"],
            borderRadius: [null, "100px"],
          }}
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
