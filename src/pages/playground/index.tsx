/** @jsxImportSource theme-ui **/
import Layout from "../../components/Layout";
import Playground from "../../components/Playground";
import { useStateValue } from "../../state/state";

import { Web3ApiProvider } from "@web3api/react";

const PlaygroundPage = () => {
  const [{ web3api }] = useStateValue();
  return (
    <Layout>
      {web3api.plugins && (
        <Web3ApiProvider plugins={web3api.plugins}>
          <Playground />
        </Web3ApiProvider>
      )}
    </Layout>
  );
};

export default PlaygroundPage;
