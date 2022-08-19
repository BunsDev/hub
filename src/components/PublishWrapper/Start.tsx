/** @jsxImportSource theme-ui **/
import styles from "./UploadBy/styles";

import { useCallback } from "react";
import { Button, Flex, Themed } from "theme-ui";

import { createApiSteps, UPLOAD_METHODS } from "utils/createWrapper";
import { useCreateApi, useRouter } from "hooks";

const Start = () => {
  const router = useRouter();
  const { setUploadMethod } = useCreateApi();

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
      <Flex className="tutorial" sx={styles.tutorial}>
        <div>
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
          <div className="bg">Two</div>
          <span className="subtitle-1">Creating a Wrapper</span>
          <a
            href="https://docs.polywrap.io/quick-start/create-wasm-wrappers/tutorial/project-setup/"
            target="_BLANK"
            rel="noreferrer"
          >
            <img src="/images/link.svg" alt="icon" />
            How to create a Wrapper
          </a>
        </div>
        <div>
          <div className="bg">Three</div>
          <span className="subtitle-1">Upload a Wrapper</span>
          <p>Choose one of the options below to upload your wrapper</p>
        </div>
      </Flex>
      <div className="arrow" sx={styles.arrow} />
      <Flex className="options" sx={styles.uploadOptions}>
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
      <Flex className="buttons" sx={styles.buttons}>
        <Button
          variant="secondaryMedium"
          className="btn-cancel"
          onClick={(e) => {
            e.preventDefault();
            void router.push("/", undefined, { shallow: true });
          }}
        >
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

export default Start;
