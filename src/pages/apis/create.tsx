/** @jsxImportSource theme-ui **/
import { useState, useEffect } from "react";
import { Box, Flex, Themed, ThemeUIStyleObject } from "theme-ui";
import { Steps, Layout } from "components";
import { Start, Publish } from "components/PublishWrapper";
import {
  DirectUpload,
  EnsAddress,
  IPFSHash,
} from "components/PublishWrapper/UploadBy";
import {
  createApiSteps,
  pushToStep,
  UPLOAD_METHODS,
  validMethod,
  validStep,
} from "utils/createWrapper";
import { useResponsive, useRouter, useStateValue } from "hooks";
import { CreateApiProvider } from "hooks/useCreateApi";
import { Web3ApiProvider } from "@web3api/react";
import useModal from "hooks/useModal";

const styles: ThemeUIStyleObject = {
  flexDirection: "column",
  height: ["fit-content", "100%"],
  p: ["50px 73px 59px 59px", ["20px"]],
  background: "black",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "12px 20px 54px -6px #141316",
  borderRadius: "20px",
  width: "100%",
};

export const uploadComponents = {
  [UPLOAD_METHODS.DIRECT_UPLOAD]: <DirectUpload />,
  [UPLOAD_METHODS.IPFS_HASH]: <IPFSHash />,
  [UPLOAD_METHODS.ENS_ADDRESS]: <EnsAddress />,
};

const CreateApi = () => {
  const router = useRouter();
  const [{ publish, web3api }] = useStateValue();
  const [activeStep, setActiveStep] = useState<string>();
  const [uploadMethod, setUploadMethod] = useState<string>("");
  const {
    mobile: { isMobile },
  } = useResponsive();
  const { openModal } = useModal("switch", { onClose: () => router.push("/") });

  useEffect(() => {
    if (isMobile) {
      openModal();
    }
  }, [isMobile]);

  useEffect(() => {
    if (router.query.activeTab) {
      setActiveStep(router.query.activeTab as string);
    }
  }, [router.query?.activeTab]);

  useEffect(() => {
    if (router.query.method) {
      setUploadMethod(router.query.method as string);
    }
  }, [router.query?.method]);

  useEffect(() => {
    if (
      router.isReady &&
      (!validStep(router.query?.activeTab as string) ||
        (router.query.activeTab === createApiSteps[2] && !publish.apiData) ||
        (router.query.method && !validMethod(router.query?.method as string)))
    ) {
      void router.push(router.pathname + `?activeTab=${createApiSteps[0]}`);
    }
  }, [
    router.isReady,
    router.query?.activeTab,
    router.query?.method,
    router.pathname,
  ]);

  return (
    <Layout>
      <CreateApiProvider value={{ uploadMethod, setUploadMethod }}>
        <Flex className="contents" sx={styles}>
          <Flex
            className="header"
            sx={{
              justifyContent: "space-between",
              mb: [".75rem", "1.375rem"],
              flexWrap: "wrap",
            }}
          >
            <Flex sx={{ flexDirection: "column" }}>
              <Themed.h2 sx={{ mb: "12px" }}>Publish Wrapper</Themed.h2>
              {router?.query?.activeTab === createApiSteps[0] && (
                <div sx={{ mb: "1rem" }} className="body-1">
                  Choose one of creating options
                </div>
              )}
            </Flex>
            <Steps
              activeStep={activeStep}
              stepsData={[
                {
                  value: "start",
                  label: "Intro",
                  onClick: () => {
                    pushToStep(router, 0);
                  },
                },
                {
                  value: "upload",
                  label: "Upload",
                  onClick: () => {
                    pushToStep(router, 1);
                  },
                },
                { value: "publish", label: "Publish", onClick: () => {} }, // eslint-disable-line
              ]}
            />
          </Flex>
          <Web3ApiProvider plugins={web3api.plugins}>
            <Box className="content" sx={{ height: "100%" }}>
              {activeStep === createApiSteps[0] && <Start />}
              {activeStep === createApiSteps[1] &&
                uploadComponents[uploadMethod]}
              {activeStep === createApiSteps[2] && publish.apiData && <Publish />}
            </Box>
          </Web3ApiProvider>
        </Flex>
      </CreateApiProvider>
    </Layout>
  );
};

export default CreateApi;
