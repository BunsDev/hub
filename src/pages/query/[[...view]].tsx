/** @jsxImportSource theme-ui **/
import { useEffect } from "react";
import { Web3ApiProvider } from "@web3api/react";

import { Modal, Playground, Layout } from "components";
import { useGetAPIfromENSParamInURL, useStateValue } from "hooks";

const PlaygroundPage = () => {
  const [
    {
      web3api,
      dapp,
      publish: { showSignInModal },
    },
    dispatch,
  ] = useStateValue();
  const { data } = useGetAPIfromENSParamInURL();

  useEffect(() => {
    const previouslySelectedWallet = localStorage.getItem("selectedWallet");

    if (!dapp.web3 && !previouslySelectedWallet) {
      dispatch({ type: "setShowSignInModal", payload: true });
    }
  }, [dapp.web3]);
  return (
    <Layout>
      {showSignInModal && !dapp.web3 && (
        <div sx={{ position: "fixed", top: 0, left: 0, zIndex: 100000 }}>
          <Modal
            screen={"connect"}
            noLeftShift
            close={() => {
              dispatch({ type: "setShowConnectModal", payload: false });
            }}
          />{" "}
        </div>
      )}
      {data !== null && web3api.plugins && (
        <Web3ApiProvider plugins={web3api.plugins}>
          <Playground api={data} />
        </Web3ApiProvider>
      )}
    </Layout>
  );
};

export default PlaygroundPage;
