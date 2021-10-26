import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3ApiQuery } from "@web3api/react";

import { MAIN_DOMAIN } from "../../constants";
import { useStateValue } from "../../state/state";
import { utf8ToKeccak256 } from "utils/hash";
import { namehash } from "ethers/lib/utils";

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

  const { execute: executeRegisterENS, data: registerData } = useWeb3ApiQuery({
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

  const { execute: executeSetResolver, data: resolverData } = useWeb3ApiQuery({
    uri: "ens/ropsten/yay2.open.web3api.eth",
    query: `mutation {
      setResolver(
        domain: $domain
        resolverAddress: $resolverAddress
        registryAddress: $registryAddress
        connection: {
          networkNameOrChainId: $network
        }
      )
    }`,
  });

  useEffect(() => {
    registerData && console.log(registerData);
  }, [registerData]);
  useEffect(() => {
    resolverData && console.log(resolverData);
  }, [resolverData]);

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
      
      //@Cesar
      const signerAddress = await dapp.web3.getSigner().getAddress();
      const domain = `${publish.subdomain}.${MAIN_DOMAIN}`;
      //const network = dapp.network;
      const registryAddress = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
      const resolverAddress = await dapp.web3
        .getSigner()
        .resolveName("resolver.eth");

      const registrationResult = await executeRegisterENS({
        domain: utf8ToKeccak256(publish.subdomain),
        registrarAddress: "0x99BeF0ec344a354303Bc5F3BB2E7e0a104B1E9f2",
        registryAddress,
        owner: signerAddress,
        network: "ropsten",
      });

      //@ts-ignore
      const hash = registrationResult.data.registerDomain.hash;

      let receip: ethers.providers.TransactionReceipt = null;

      //loop for guaranteed receipt obtainment
      const loop = setInterval(async () => {
        receip = await dapp.web3.getTransactionReceipt(hash);
        if (receip !== null) {
          console.log("receip obtained", receip);
          clearInterval(loop);
          
          const setResolverResult = await executeSetResolver({
            domain: namehash(publish.subdomain),
            resolverAddress,
            registryAddress,
            network: "ropsten",
          });
          console.log("setResolverResult", setResolverResult);
        }
      }, 1000);

      /*      
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
