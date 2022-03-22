import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3ApiClient, useWeb3ApiQuery } from "@web3api/react";

import { ENS_REGISTRY, FIFS_REGISTRAR, MAIN_DOMAIN } from "../../constants";
import { useStateValue } from "../../state/state";
import { utf8ToKeccak256 } from "utils/hash";
import { namehash } from "ethers/lib/utils";
import { QueryApiResult } from "@web3api/core-js";
import { networks } from "utils/networks";

const contentHash = require("content-hash"); // eslint-disable-line

interface useRegisterEnsState {
  data?: Record<string, unknown>;
  errors?: Error[];
  loading: boolean;
}
type TransactionReceipt = ethers.providers.TransactionReceipt;

type QueryApi = () => Promise<
  QueryApiResult<{ [key: string]: { hash: string } }>
>;

export const useRegisterEns = () => {
  const [{ dapp, publish }, dispatch] = useStateValue();
  const [state, setState] = useState<useRegisterEnsState>({
    data: {},
    errors: [],
    loading: false,
  });

  //registerDomain
  //setContentHash
  //createSubdomain

  const networkName = networks[dapp.network].name;
  const { execute: registerDomain } = useWeb3ApiQuery({
    uri: `ipfs/QmTPSFGfzX5YpNBHkvzLRXqQxurLoZXZCymUX56n4q9dwK`,
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

  const { execute: setResolver } = useWeb3ApiQuery({
    uri: `ipfs/QmTPSFGfzX5YpNBHkvzLRXqQxurLoZXZCymUX56n4q9dwK`,
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

  const { execute: setContentHash } = useWeb3ApiQuery({
    uri: `ipfs/QmTPSFGfzX5YpNBHkvzLRXqQxurLoZXZCymUX56n4q9dwK`,
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

  const loopfn = useCallback(
    (
      receip: TransactionReceipt,
      hash: string,
      callback = async () => {},
      ms = 3000
    ) => {
      const loop = setInterval(async () => {
        try {
          receip = await dapp.web3.getTransactionReceipt(hash);
          if (receip !== null) {
            clearInterval(loop);
            await callback();
          }
        } catch (e) {
          setState((state) => ({ ...state, loading: false, errors: [e] }));
        }
      }, ms);
      return loop;
    },
    [dapp.web3]
  );

  const execute = useCallback(async () => {
    if (!dapp.web3) {
      throw new Error("No web3 provider set");
    }
    setState((state) => ({ ...state, loading: true }));

    const signerAddress = await dapp.web3.getSigner().getAddress();
    const domain = publish.subdomain;
    const registryAddress = ENS_REGISTRY;
    const registrarAddress = FIFS_REGISTRAR;
    const resolverAddress = await dapp.web3
      .getSigner()
      .resolveName("resolver.eth");

    const network = networkName;

    const executeRegisterDomain: QueryApi = registerDomain.bind(null, {
      domain,
      registrarAddress,
      registryAddress,
      owner: signerAddress,
      network,
    });

    const executeSetResolver: QueryApi = setResolver.bind(null, {
      domain,
      resolverAddress,
      registryAddress,
      network,
    });

    const executeSetContentHash: QueryApi = setContentHash.bind(null, {
      domain,
      cid: `0x${contentHash.fromIpfs(publish.ipfs)}`,
      resolverAddress,
      network,
    });

    const executeRegisterChain = async () => {
      try {
        const result_registerDomain = await executeRegisterDomain();
        const hash_registerDomain =
          result_registerDomain.data.registerDomain.hash;

        let receip_registerDomain: TransactionReceipt = null;
        loopfn(receip_registerDomain, hash_registerDomain, async () => {
          const result_setResolver = await executeSetResolver();
          const hash_setResolver = result_setResolver.data.setResolver.hash;

          let receip_setResolver: TransactionReceipt = null;
          loopfn(receip_setResolver, hash_setResolver, async () => {
            const result_setContentHash = await executeSetContentHash();
            const hash_setContentHash =
              result_setContentHash.data.setContentHash.hash;

            let receip_setContentHash: TransactionReceipt = null;
            loopfn(receip_setContentHash, hash_setContentHash, () => {
              dispatch({ type: "setsubdomainRegisterSuccess", payload: true });
              setState((state) => ({ ...state, loading: false }));
            });
          });
        });
      } catch (e) {
        console.log("error", e);
        dispatch({ type: "setsubdomainError", payload: e });
        setState((state) => ({ ...state, errors: [e], loading: false }));
      }
    };
    executeRegisterChain();
  }, [dapp.web3, publish.subdomain]);

  return [execute, state] as const;
};

export default useRegisterEns;
