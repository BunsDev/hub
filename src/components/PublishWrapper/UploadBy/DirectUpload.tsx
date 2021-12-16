/** @jsxImportSource theme-ui **/
import styles from "./styles";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import yaml from "js-yaml";
import { Flex } from "@theme-ui/components";
import { Wrapper, NavButtons } from "components/PublishWrapper";
import { Spinner } from "components";
import { useStateValue, useRouter, useResponsive } from "hooks";
import {
  createApiSteps,
  uploadToIPFS,
  validateUploadedWrapper,
} from "utils/createWrapper";
import { APIData } from "hooks/ens/useGetAPIfromENS";

const directoryProps = {
  directory: "",
  webkitdirectory: "",
  mozdirectory: "",
};
export const DirectUpload = () => {
  const [_, dispatch] = useStateValue();
  const {
    mobile: { isMobile },
  } = useResponsive();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true);

    const [filesValidated, requiredFiles, files] =
      validateUploadedWrapper(acceptedFiles);

    if (filesValidated) {
      let uploadSuccess: boolean;

      try {
        const hash = await uploadToIPFS(files);
        if (hash) {
          dispatch({ type: "setipfs", payload: hash });
          uploadSuccess = true; // eslint-disable-line
        }
      } catch (error) {
        console.log("Error uploading files: ", error);
      }
      if (uploadSuccess) {
        try {
          const reader = new FileReader();
          reader.onload = () => {
            const metaData = yaml.load(String(reader.result)) as APIData;
            dispatch({ type: "setApiData", payload: metaData });
            setLoading(false);
            void router.push(
              router.pathname + `?activeTab=${createApiSteps[2]}`
            );
          };
          reader.readAsText(requiredFiles?.meta as any); // eslint-disable-line
        } catch (error) {
          console.error("Error reading metadata: ", error);
        }
      }
    } else {
      console.error("Wrapper files validation failure");
    }
    setLoading(false);
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
        <Flex {...getRootProps()} sx={styles.dropzoneWrap}>
          {loading ? (
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
      )}

      <NavButtons nextBtn={{ label: "Browse Files", onClick: () => {} }} />
    </Wrapper>
  );
};

export default DirectUpload;
