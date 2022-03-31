import Auth from "../services/ceramic/auth";
import { State } from "../state/initialState";
import { useStateValue } from "../state/state";
import { domain } from "../constants";
import useLocalStorage from "./useLocalStorage";

import axios from "axios";
import { useCallback, useEffect } from "react";

const useAuth = (dapp: State["dapp"]) => {
  const [_, dispatch] = useStateValue();
  const { did } = dapp;
  const [cachedDid, setCachedDid] = useLocalStorage("did", did);

  const isAuthenticated = Auth.ceramic.did?.authenticated;

  useEffect(() => {
    if (cachedDid) {
      dispatch({
        type: "SET_DID",
        payload: cachedDid,
      });
    }
  }, [cachedDid, dispatch]);

  const set = useCallback(
    async (key, values) => {
      await Auth.getInstance(dapp.web3);
      if (Auth.idx.authenticated) {
        if (dapp.web3) return await Auth.set(key, values);
        // open connect modal
        return;
      }
      //await Auth.getInstance(dapp.web3);
    },
    [Auth, dapp]
  );

  const get = useCallback(
    async (key: string) => {
      if (Auth.idx.authenticated) {
        return await Auth.get(key);
      }
      await Auth.getInstance(dapp.web3);
    },
    [Auth, dapp]
  );

  const authenticate = useCallback(async () => {
    await Auth.getInstance(dapp.web3);

    if (Auth.ceramic.did?.authenticated) {
      // do a request to backend sending the DID
      // the backend will hash this DID and store it
      const { id } = Auth.ceramic.did;
      await axios.post(domain + `/api/auth/sign-in`, {
        did: id,
      });

      setCachedDid(id);
      dispatch({
        type: "SET_DID",
        payload: id,
      });
    }
  }, [Auth, dispatch, dapp.web3]);

  return { set, get, authenticate, isAuthenticated };
};

export default useAuth;
