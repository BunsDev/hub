/** @jsxImportSource theme-ui **/
import { Web3ApiProvider } from "@web3api/react";
import { Layout, APIDetail } from "components";
import { useGetAPIfromENSParamInURL, useStateValue } from "hooks";
import { useLoading } from "hooks/useLoading";

const ApiView = () => {
  const { data, loading } = useGetAPIfromENSParamInURL();
  const [{ web3api }] = useStateValue();
  const withLoading = useLoading(loading);

  return (
    <Layout>
      {web3api.plugins && (
        <Web3ApiProvider plugins={web3api.plugins}>
          {withLoading(<APIDetail api={data} />)}
        </Web3ApiProvider>
      )}
    </Layout>
  );
};

export default ApiView;
