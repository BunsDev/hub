import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type ResponsiveContextValue = {
  uploadMethod: string;
  setUploadMethod: Dispatch<SetStateAction<string>>;
};

export const CreateApiContext = createContext<ResponsiveContextValue>({
  uploadMethod: "",
  setUploadMethod: () => undefined,
});

export const CreateApiProvider = ({
  value,
  children,
}: {
  value: ResponsiveContextValue;
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
