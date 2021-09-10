import { NextRouter } from "next/router";
/* eslint-disable @typescript-eslint/naming-convention */
import { IpfsPlugin } from "@web3api/ipfs-plugin-js";

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
  router.push(router.pathname + `?activeTab=${createApiSteps[stepIndex]}`);
};

export const apiDataInState = (activeTab: string, apiData: any) =>
  activeTab === createApiSteps[2] && apiData;

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
  files: any[]
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

export const uploadToIPFS = async (files: File[]) => {
  const ipfsPlugin = new IpfsPlugin({
    provider: process.env.IPFS_PROVIDER,
  });
  const filesFormatted = files.map((file) => ({
    path: file.name,
    content: file,
  }));

  const uploadedFiles: { name: string; hash: string }[] =
    //@ts-ignore
    await ipfsPlugin._ipfs.add(filesFormatted, {
      wrapWithDirectory: true,
    });
  const rootHash = uploadedFiles?.find((file) => file.name === "")?.hash;

  return rootHash || "";
};
