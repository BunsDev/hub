import { API } from "bnc-onboard/dist/src/interfaces";
import { useStateValue } from "hooks";
import { useEffect, useState } from "react";
import { networks } from "utils/networks";
import onboardInit from "utils/onboardInit";
import useModal from "./useModal";

const useOnboarding = () => {
  const [_, dispatch] = useStateValue();
  const [onboard, setOnboard] = useState<API>();
  const { openModal, visible: modalVisible } = useModal('changeNetwork')
  const network = onboard?.getState()?.network

  useEffect(() => {
    const onboard = onboardInit(dispatch);
    setOnboard(onboard);
  }, []);

  useEffect(() => {
    if (network) {
      if (
        !Object.keys(networks).includes(String(network))
      ) {
        openModal();
      }
      if (Object.keys(networks).includes(String(network)) && modalVisible) {
        openModal(false)
      }
    }

  }, [network])

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
