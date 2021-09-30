import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type UseCreteApiContextValue = {
  uploadMethod: string;
  setUploadMethod: Dispatch<SetStateAction<string>>;
};

export const CreateApiContext = createContext<UseCreteApiContextValue>({
  uploadMethod: "",
  setUploadMethod: () => undefined,
});

export const CreateApiProvider = ({
  value,
  children,
}: {
  value: UseCreteApiContextValue;
  children: React.ReactNode;
}) => {
  return (
    <CreateApiContext.Provider value={value}>
      {children}
    </CreateApiContext.Provider>
  );
};

export const useCreateApi = () => useContext(CreateApiContext);

export default useCreateApi;
