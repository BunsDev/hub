import { createContext, Dispatch, SetStateAction } from "react";

export const CreateApiContext = createContext<{
  uploadMethod: string;
  setUploadMethod: Dispatch<SetStateAction<string>>;
}>({
  uploadMethod: "",
  setUploadMethod: () => undefined,
});

export default CreateApiContext;
