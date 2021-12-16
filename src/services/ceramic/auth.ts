import { ThreeIdConnect, EthereumAuthProvider } from "@3id/connect";
import Ceramic from "@ceramicnetwork/http-client";
import { IDX } from "@ceramicstudio/idx";
import { DID } from "dids";
import KeyDidResolver from "key-did-resolver";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import { JsonRpcProvider } from "@web3api/client-js/build/pluginConfigs/Ethereum";

const CERAMIC_NODE =
  process.env.CERAMIC_NODE || "https://ceramic-clay.3boxlabs.com";

const aliases = {
  authentication:
    "kjzl6cwe1jw148u82hnzcxx40jmyv4rkssid4rlhz7mku1rpxtnvf4nu9z2loup",
  favorites: "kjzl6cwe1jw14a0t4tt61bsk9a0nt07txma6ra5bkccacfmcpvi9weiuprp7n8r",
};

export default class Auth {
  public static ceramic: Ceramic = new Ceramic(CERAMIC_NODE);
  public static idx: IDX = new IDX({ ceramic: Auth.ceramic, aliases });
  private static _instance: Auth;

  public static async getInstance(provider?: JsonRpcProvider): Promise<void> {
    if (!this._instance && provider) {
      const instance = new Auth();
      await instance.initialize(provider);
      this._instance = instance;
    }
  }

  public static async set(
    key: string,
    values: Record<string, unknown>
  ): Promise<void> {
    await Auth.idx.set(key, values);
  }

  public static async get(key: string): Promise<unknown> {
    return await Auth.idx.get(key);
  }

  private async initialize(provider: JsonRpcProvider): Promise<void> {
    try {
      const did = Auth.createDID();
      await Auth.ceramic.setDID(did);
      const didProvider = await Auth.createBlockchainConnection(provider);
      await Auth.ceramic.did.setProvider(didProvider);
      await Auth.ceramic.did.authenticate();
    } catch (e) {
      console.log("Error doing the connection of ceramic ", e);
    }
  }

  private static createDID() {
    const resolver = {
      ...KeyDidResolver.getResolver(),
      ...ThreeIdResolver.getResolver(Auth.ceramic),
    };
    const did = new DID({ resolver });
    return did;
  }

  private static async createBlockchainConnection({
    provider,
  }: JsonRpcProvider) {
    const authProvider = new EthereumAuthProvider(
      provider,
      provider.selectedAddress
    );
    const threeIdConnect = new ThreeIdConnect();
    await threeIdConnect.connect(authProvider);
    const didProvider = await threeIdConnect.getDidProvider();

    return didProvider;
  }
}
