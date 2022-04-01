import { useStateValue } from "hooks";
import { useEffect } from "react";
import { networks } from "utils/networks";
import onboardInit from "utils/onboardInit";
import useModal from "./useModal";

const useOnboarding = () => {
  const [
    {
      dapp: { onboard, network },
    },
    dispatch,
  ] = useStateValue();
  const { openModal, visible: modalVisible } = useModal("changeNetwork");

  useEffect(() => {
    const init = async () => {
      const onboard = await onboardInit(dispatch);
      dispatch({
        type: "SET_ONBOARDING",
        payload: onboard,
      });
    };

    void init();
  }, []);

  useEffect(() => {
    //console.log('network changed:', network)
    if (network) {
      if (!Object.keys(networks).includes(String(network))) {
        openModal();
      }
      if (Object.keys(networks).includes(String(network)) && modalVisible) {
        openModal(false);
      }
    }
  }, [network]);

  useEffect(() => {
    const previouslySelectedWallet = localStorage.getItem("selectedWallet");

    if (
      previouslySelectedWallet &&
      previouslySelectedWallet !== "undefined" &&
      onboard
    ) {
      onboard?.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);
};

export default useOnboarding;
