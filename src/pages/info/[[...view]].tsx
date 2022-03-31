/** @jsxImportSource theme-ui **/
import { Web3ApiProvider } from "@web3api/react";
import { Layout, APIDetail } from "components";
import { useGetAPIfromENSParamInURL, useStateValue } from "hooks";

const ApiView = () => {
  const { data, fetchApiDetails } = useGetAPIfromENSParamInURL();
  const [{ web3api }] = useStateValue();
  return (
    <Layout>
      {web3api.plugins && (
        <Web3ApiProvider plugins={web3api.plugins}>
          {!!data && <APIDetail api={data} />}
        </Web3ApiProvider>
      )}
    </Layout>
  );
};

export default ApiView;
