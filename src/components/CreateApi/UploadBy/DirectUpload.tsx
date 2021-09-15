/** @jsxImportSource theme-ui **/
import NavButtons from "../NavButtons";
import { Wrapper } from "../Wrapper";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import yaml from "js-yaml";
import Spinner from "../../Spinner";
import { Flex } from "@theme-ui/components";
import { useStateValue } from "../../../state/state";
import { useRouter } from "next/router";
import {
  createApiSteps,
  uploadToIPFS,
  validateUploadedWrapper,
} from "../../../utils/createWrapper";
import { APIData } from "../../../hooks/ens/useGetAPIfromENS";
import { IpfsPlugin } from "@web3api/ipfs-plugin-js";
import axios from "axios";

export const DirectUpload = () => {
  const [
    {
      mobile: { isMobile },
    },
    dispatch,
  ] = useStateValue();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true);

    const [filesValidated, filesObj] = validateUploadedWrapper(acceptedFiles);

    if (filesValidated) {
      let uploadSuccess: boolean;

      try {
        const hash = await uploadToIPFS(acceptedFiles);
        dispatch({ type: "setipfs", payload: hash });
        uploadSuccess = true;
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
            router.push(router.pathname + `?activeTab=${createApiSteps[2]}`);
          };
          reader.readAsText(filesObj?.buildMeta as any);
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
        <Flex
          {...getRootProps()}
          sx={{
            margin: "0 auto",
            flexDirection: "column",
            alignItems: "center",
            p: "3.75rem",
            border: "1.5px dashed #FFFFFF50",
            borderRadius: "1.25rem",
            maxWidth: "32.125rem",
          }}
        >
          {loading ? (
            <>
              <Spinner />
              <p>Uploading...</p>
            </>
          ) : (
            <>
              <input {...getInputProps()} />
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

      <NavButtons continueEnabled={true} nextBtn={{ label: "Browse Files" }} />
    </Wrapper>
  );
};

export default DirectUpload;
