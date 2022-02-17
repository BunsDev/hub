import { networkID as defaultNetworkID } from "../constants";

import Onboard from "bnc-onboard";
import { API, Subscriptions } from "bnc-onboard/dist/src/interfaces";
import { networks } from "./networks";

let onboard: API | undefined;

const getNetworkId = async () => {
  if (window) {
    //@ts-ignore
    if (window.ethereum) {
      //@ts-ignore
      const version = await window.ethereum.request({ method: "net_version" });
      const supportedNetwork = Object.keys(networks).find(
        (key) => key == version
      );
      const networkId = supportedNetwork || defaultNetworkID;
      return Number(networkId);
    }
  }
  return defaultNetworkID;
};
const getOnboard = async (subscriptions: Subscriptions): Promise<API> => {
  if (!onboard) {
    onboard = Onboard({
      dappId: "834729ff-3ae1-42ec-b770-95de5ff553a0",
      subscriptions,
      hideBranding: true,
      networkId: await getNetworkId(),
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
