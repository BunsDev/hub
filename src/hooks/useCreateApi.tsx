import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type CreateApiContextValue = {
  uploadMethod: string;
  setUploadMethod: Dispatch<SetStateAction<string>>;
};

export const CreateApiContext = createContext<CreateApiContextValue>({
  uploadMethod: "",
  setUploadMethod: () => undefined,
});

export const CreateApiProvider = ({
  value,
  children,
}: {
  value: CreateApiContextValue;
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
