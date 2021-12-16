/** @jsxImportSource theme-ui **/
import { Web3ApiProvider } from "@web3api/react";
import { Playground, Layout } from "components";
import { useStateValue } from "hooks";

const PlaygroundPage = () => {
  const [
    {
      web3api,
      publish: { showSignInModal },
    },
  ] = useStateValue();

  /* disabling login modal on using playground unauthorized   
useEffect(() => {
    const previouslySelectedWallet = localStorage.getItem("selectedWallet");

    if (!dapp.web3 && !previouslySelectedWallet) {
      dispatch({ type: "setShowSignInModal", payload: true });
    }
  }, [dapp.web3]); */

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
