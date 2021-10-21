import { NextRouter } from "next/router";
import axios from "axios";

export const UPLOAD_METHODS: {
  DIRECT_UPLOAD: string;
  IPFS_HASH: string;
  ENS_ADDRESS: string;
} = {
  DIRECT_UPLOAD: "direct",
  IPFS_HASH: "ipfsHash",
  ENS_ADDRESS: "ensAddress",
};

export const createApiSteps = ["start", "upload", "publish"];

export const validStep = (stepInput: string) =>
  createApiSteps.some((step) => stepInput === step);

export const validMethod = (methodInput: string) =>
  Object.values(UPLOAD_METHODS).some((method) => methodInput === method);

export const pushToStep = (router: NextRouter, stepIndex: number) => {
  void router.push(router.pathname + `?activeTab=${createApiSteps[stepIndex]}`);
};

export const apiDataInState = (
  activeTab: string,
  apiData: any // eslint-disable-line
) => activeTab === createApiSteps[2] && apiData;

interface WrapperReqFiles {
  [key: string]: File;
  config: File;
  build: File;
  buildMeta: File;
  mutation: File;
  query: File;
  schema: File;
}

export const validateUploadedWrapper = (
  files: File[]
): [boolean, WrapperReqFiles] => {
  const validated: WrapperReqFiles = {
    config: files?.find((file) => file.name === "web3api.yaml"),
    build: files?.find((file) => file.name === "web3api.build.yaml"),
    buildMeta: files?.find((file) => file.name === "web3api.build.meta.yaml"),
    mutation: files?.find((file) => file.name === "mutation.wasm"),
    query: files?.find((file) => file.name === "query.wasm"),
    schema: files?.find((file) => file.name === "schema.graphql"),
  };

  for (const file in validated) {
    if (!validated[file]) {
      console.log("Missing", file, "file");
      return [false, null];
    }
  }

  return [true, validated];
};

export const uploadToIPFS = async (validatedFilesObj: WrapperReqFiles) => {
  const data = new FormData();

  for (const key in validatedFilesObj) {
    //@ts-ignore
    data.append("file", validatedFilesObj[key], validatedFilesObj[key].path);
  }

  const {
    data: { IpfsHash },
  } = await axios.post(process.env.IPFS_UPLOAD_ENDPOINT, data, {
    headers: {
      //@ts-ignore
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: process.env.IPFS_API_KEY,
      pinata_secret_api_key: process.env.IPFS_SECRET_API_KEY,
    },
  });

  return IpfsHash || "";
};
