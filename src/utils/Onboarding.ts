import { networkID } from "../constants";

import Onboard from "bnc-onboard";
import { API, Subscriptions } from "bnc-onboard/dist/src/interfaces";
import { networks, SupportedNetworks } from "./networks";

let onboard: API | undefined;

const getNetworkId = () => {
  if (window) {
    const networkId =
      Object.keys(networks).find(
        //@ts-ignore
        (key) => key == window?.ethereum?.networkVersion
      ) || networkID;
    return Number(networkId);
  }
  return networkID;
};
const getOnboard = (subscriptions: Subscriptions): API => {
  if (!onboard) {
    onboard = Onboard({
      dappId: "834729ff-3ae1-42ec-b770-95de5ff553a0",
      subscriptions,
      hideBranding: true,
      //@ts-ignore
      networkId: getNetworkId(),
      walletSelect: {
        wallets: [
          { walletName: "metamask", preferred: true },
          {
            walletName: "walletConnect",
            preferred: true,
            infuraKey: "e1fd18285cab4a02adac214587d3f112",
          },
        ],
      },
    });
  }
  return onboard;
};

export default getOnboard;
