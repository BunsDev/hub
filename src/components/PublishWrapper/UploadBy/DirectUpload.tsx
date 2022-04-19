/** @jsxImportSource theme-ui **/
import styles from "./styles";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Flex } from "@theme-ui/components";
import { Wrapper, NavButtons, ErrorMsg } from "components/PublishWrapper";
import { Spinner } from "components";
import { useStateValue, useRouter, useResponsive } from "hooks";
import {
  createApiSteps,
  uploadToIPFS,
  validateUploadedWrapper,
} from "utils/createWrapper";
import getMetaDataFromPackageUri from "services/ipfs/getMetaDataPackageUri";
import { useWeb3ApiClient } from "@web3api/react";
import findPublishedApi from "utils/api/findPublishedApi";
import { ErrorDuplicateApi } from "./shared";

const directoryProps = {
  directory: "",
  webkitdirectory: "",
  mozdirectory: "",
};
interface UploadState {
  loading: boolean;
  error?: string | React.ReactNode;
}

export const DirectUpload = () => {
  const [{ publish }, dispatch] = useStateValue();
  const {
    mobile: { isMobile },
  } = useResponsive();
  const [uploadState, setUploadState] = useState<UploadState>({
    loading: false,
    error: null,
  });
  const router = useRouter();
  const client = useWeb3ApiClient();

  const onDrop = async (acceptedFiles: File[]) => {
    setUploadState((state) => ({ ...state, error: null, loading: true }));

    const [filesValidated, _, files] = validateUploadedWrapper(acceptedFiles);

    if (!filesValidated) {
      console.error("Wrapper files validation failure");
    } else {
      try {
        const hash = await uploadToIPFS(files);

        const publishedApiUri = await findPublishedApi(hash);
        if (publishedApiUri) {
          setUploadState((state) => ({
            ...state,
            loading: false,
            error: <ErrorDuplicateApi uri={publishedApiUri} />,
          }));
          return;
        }
        if (hash) {
          dispatch({ type: "setipfs", payload: hash });
          //Using client so it can polyfill mising properties
          const metadata = await getMetaDataFromPackageUri(
            client,
            "ipfs/" + publish.ipfs
          );

          if (metadata) {
            dispatch({ type: "setApiData", payload: metadata });
            void router.push(
              router.pathname + `?activeTab=${createApiSteps[2]}`
            );
          }
        }
      } catch (error) {
        console.log("Error uploading files: ", error);
        setUploadState({ error: error.message, loading: false });
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Wrapper>
      {isMobile ? (
        <Flex sx={{ height: "30vh" }}>
          <img
            src="/images/dragndrop.svg"
            alt="drag here"
            sx={{ width: "160px", height: "auto", m: "auto" }}
          />
        </Flex>
      ) : (
        <>
          <Flex {...getRootProps()} sx={styles.dropzoneWrap}>
            {uploadState.loading ? (
              <>
                <Spinner size={128} />
                <p>Uploading...</p>
              </>
            ) : (
              <>
                <input {...getInputProps()} {...directoryProps} />
                <img src="/images/dragndrop.svg" alt="drag here" />
                <>
                  <p
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                      textAlign: "center",
                    }}
                  >
                    Drag and Drop To Upload
                  </p>
                  <p sx={{ cursor: "pointer" }}>Or Browse</p>
                </>
              </>
            )}
          </Flex>
          <ErrorMsg center>{uploadState.error}</ErrorMsg>
        </>
      )}

      <NavButtons nextBtn={{ label: "Browse Files", onClick: () => {} }} />
    </Wrapper>
  );
};

export default DirectUpload;
