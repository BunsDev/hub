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
  api: File;
  build: File;
  meta: File;
  //mutation: File;
  //query: File;
  //schema: File;
  //icon: File;
}

export const validateUploadedWrapper = (
  files: File[]
): [boolean, WrapperReqFiles, File[]] => {
  const requiredFiles: WrapperReqFiles = {
    api: files?.find((file) => file.name === "web3api.yaml"),
    build: files?.find((file) => file.name === "web3api.build.yaml"),
    meta: files?.find((file) => file.name === "web3api.meta.yaml"),
    //mutation: files?.find((file) => file.name === "mutation.wasm"),
    //query: files?.find((file) => file.name === "query.wasm"),
    //schema: files?.find((file) => file.name === "schema.graphql"),
    //icon: files?.find((file) => file.name.includes("icon")),
  };

  for (const key in requiredFiles) {
    if (!requiredFiles[key]) {
      console.log("Missing", key, "file");
      return [false, null, null];
    }
  }

  return [true, requiredFiles, files];
};

export const uploadToIPFS = async (validatedFilesObj: File[]) => {
  const data = new FormData();

  for (const file of validatedFilesObj) {
    if (file.type.includes("image/")) {
      //@ts-ignore
      data.append("file", new Blob([file], { type: file.type }), file?.path);
      continue;
    }
    //@ts-ignore
    data.append("file", file, file.path);
  }

  const {
    data: { IpfsHash },
  } = await axios.post(process.env.NEXT_PUBLIC_IPFS_UPLOAD_ENDPOINT, data, {
    headers: {
      //@ts-ignore
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: process.env.NEXT_PUBLIC_IPFS_API_KEY,
      pinata_secret_api_key: process.env.NEXT_PUBLIC_IPFS_SECRET_API_KEY,
    },
  });

  return IpfsHash || "";
};
