import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3ApiQuery } from "@web3api/react";

import { MAIN_DOMAIN } from "../../constants";
import { useStateValue } from "../../state/state";

interface useRegisterEnsState {
  data?: Record<string, unknown>;
  errors?: Error[];
  loading: boolean;
}

export const useRegisterEns = () => {
  const [{ dapp, publish }] = useStateValue();
  const [state, setState] = useState<useRegisterEnsState>({
    data: {},
    errors: [],
    loading: false,
  });

  //registerDomain
  //setContentHash
  //createSubdomain

  const { execute: executeRegisterENS } = useWeb3ApiQuery({
    uri: "ens/ropsten/yay2.open.web3api.eth",
    query: `mutation {
    registerDomain(
      domain: $domain
      owner: $owner
      registrarAddress: $registrarAddress
      registryAddress: $registryAddress
      network: $network
    )
  }`,
  });

  const { execute: executeSetContentHash } = useWeb3ApiQuery({
    uri: "ens/ropsten/yay2.open.web3api.eth",
    query: `mutation {
      setContentHash(
        domain: $domain
        cid: $cid
        resolverAddress: $resolverAddress
        connection: {
          networkNameOrChainId: $network
        }
      )
    }`,
  });

  const execute = useCallback(async () => {
    try {
      if (!dapp.web3) {
        throw new Error("No web3 provider set");
      }
      setState((state) => ({ ...state, loading: true }));

      const signerAddress = await dapp.web3.getSigner().getAddress();
      const domain = `${publish.subdomain}.${MAIN_DOMAIN}`;
      const network = dapp.network;
      const registrationResult = await executeRegisterENS({
        domain,
        registrarAddress: "0x99BeF0ec344a354303Bc5F3BB2E7e0a104B1E9f2",
        registryAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
        owner: signerAddress,
        network: "ropsten",
      });
      console.log("regResult", registrationResult);

/*       const resolverAddress = await dapp.web3
        .getSigner()
        .resolveName("resolver.eth");

      const cHash = await executeSetContentHash({
        domain,
        cid: publish.ipfs,
        resolverAddress,
        network: "ropsten",
      });
      console.log("cHash", cHash); */

      setState((state) => ({ ...state, ...registrationResult }));
    } catch (e) {
      console.log("error", e);
      setState((state) => ({ ...state, errors: [e] }));
    } finally {
      setState((state) => ({ ...state, loading: false }));
    }
  }, [dapp.web3, publish.subdomain]);

  return [execute, state] as const;
};

export default useRegisterEns;
