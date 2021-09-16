/* eslint-disable @typescript-eslint/naming-convention */
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

export const apiDataInState = (activeTab: string, apiData: any) =>
  activeTab === createApiSteps[2] && apiData;

interface WrapperReqFiles {
  [key: string]: File;
  config: File;
  build: File;
  meta: File;
  mutation: File;
  query: File;
  schema: File;
}

export const validateUploadedWrapper = (
  files: any[]
): [boolean, WrapperReqFiles] => {
  const validated: WrapperReqFiles = {
    config: files?.find((file) => file.name === "web3api.yaml"),
    build: files?.find((file) => file.name === "web3api.build.yaml"),
    meta: files?.find((file) => file.name === "web3api.meta.yaml"),
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

export const uploadToIPFS = async (files: File[]) => {
  try {
    return await pinDirectoryToIPFS(files);
  } catch (e) {
    console.error(e);
  }
};

export const pinDirectoryToIPFS = async (files: any[]): Promise<string> => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const pinataApiKey = process.env.IPFS_API_KEY;
  const pinataSecretApiKey = process.env.IPFS_SECRET_API_KEY;

  let data = new FormData();
  files.forEach((file) => data.append("file", file, file.path));

  return axios
    .post(url, data, {
      maxBodyLength: 10000000,
      headers: {
        //@ts-ignore
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    })
    .then((res) => res.data.IpfsHash)
    .catch((e) => {
      throw new Error(e);
    });
};
