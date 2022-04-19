import { useCallback, useState } from "react";
import { ethers } from "ethers";
import { useWeb3ApiClient } from "@web3api/react";

import { ENS_REGISTRY, FIFS_REGISTRARS } from "../../constants";
import { useStateValue } from "../../state/state";

import { QueryApiOptions, QueryApiResult } from "@web3api/core-js";
import { networks } from "utils/networks";
import {
  registerDomainQuery,
  setContentHashQuery,
  setResolverQuery,
} from "utils/queries";

const contentHash = require("content-hash"); // eslint-disable-line

interface useRegisterEnsState {
  data?: Record<string, unknown>;
  errors?: Error[];
  loading: boolean;
}
type TransactionReceipt = ethers.providers.TransactionReceipt;

type ApiQueryResult = { hash: string };
type ApiQuery = Record<string, ApiQueryResult>;

export const useRegisterEns = () => {
  const [{ dapp, web3api, publish }, dispatch] = useStateValue();
  const [state, setState] = useState<useRegisterEnsState>({
    data: {},
    errors: [],
    loading: false,
  });
  const client = useWeb3ApiClient();

  const networkName = networks[dapp.network].name;

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
    const registrarAddress = FIFS_REGISTRARS[dapp.network];
    const resolverAddress = await dapp.web3
      .getSigner()
      .resolveName("resolver.eth");

    const network = networkName;
    const apiUri = `ens/${networkName}/ens.web3api.eth`;

    const registerDomainOptions: QueryApiOptions = {
      uri: apiUri,
      query: registerDomainQuery,
      variables: {
        domain,
        registrarAddress,
        registryAddress,
        owner: signerAddress,
        network,
      },
    };

    const setResolverOptions: QueryApiOptions = {
      uri: apiUri,
      query: setResolverQuery,
      variables: {
        domain,
        resolverAddress,
        registryAddress,
        network,
      },
    };
    const setContentHashOptions: QueryApiOptions = {
      uri: apiUri,
      query: setContentHashQuery,
      variables: {
        domain,
        cid: `0x${contentHash.fromIpfs(publish.ipfs)}`,
        resolverAddress,
        network,
      },
    };

    const handleQueryResult = (
      { data, errors }: QueryApiResult<ApiQuery>,
      key: string,
      callback: (data: ApiQueryResult) => void
    ) => {
      if (data[key]) {
        callback(data[key]);
      }
      if (errors && errors?.length) {
        setState((state) => ({
          ...state,
          errors: [...errors],
          loading: false,
        }));
      }
    };

    const executeRegisterChain = async () => {
      try {
        const result_registerDomain = await client.query<ApiQuery>(
          registerDomainOptions
        );

        handleQueryResult(
          result_registerDomain,
          "registerDomain",
          ({ hash: hash_registerDomain }) => {
            const receip_registerDomain: TransactionReceipt = null;
            loopfn(receip_registerDomain, hash_registerDomain, async () => {
              const result_setResolver = await client.query<ApiQuery>(
                setResolverOptions
              );

              handleQueryResult(
                result_setResolver,
                "setResolver",
                ({ hash: hash_setResolver }) => {
                  const receip_setResolver: TransactionReceipt = null;
                  loopfn(receip_setResolver, hash_setResolver, async () => {
                    const result_setContentHash = await client.query<ApiQuery>(
                      setContentHashOptions
                    );

                    handleQueryResult(
                      result_setContentHash,
                      "setContentHash",
                      ({ hash: hash_setContentHash }) => {
                        const receip_setContentHash: TransactionReceipt = null;
                        loopfn(
                          receip_setContentHash,
                          hash_setContentHash,
                          () => {
                            dispatch({
                              type: "setsubdomainRegisterSuccess",
                              payload: true,
                            });
                            setState((state) => ({ ...state, loading: false }));
                          }
                        );
                      }
                    );
                  });
                }
              );
            });
          }
        );
      } catch (e) {
        console.log("try catch error", e);
        dispatch({ type: "setsubdomainError", payload: e });
        setState((state) => ({
          ...state,
          errors: [e],
          loading: false,
        }));
      }
    };
    void executeRegisterChain();
  }, [dapp.web3, publish.subdomain, dapp.network]);

  return [execute, state] as const;
};

export default useRegisterEns;
