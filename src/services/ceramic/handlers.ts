import { DAppAction, StateAction } from "../../state/action";
import Auth from "./auth";

import { Dispatch } from "react";
import { JWE } from "did-jwt";
import { APIData } from "hooks/ens/useGetAPIfromENS";
import { API_URI_TYPE_ID } from "src/constants";

// We can add custom logic for each web2
// service that we want to
// support on the Web3Hub
export const githubHandler = async (
  tokenFromIDX: JWE,
  cachedToken: string,
  dispatch: Dispatch<DAppAction>
): Promise<void> => {
  const tokenIsCached = !!cachedToken;

  // If token is stored in local state but not in IDX, update IDX state
  // This is needed because for GitHub auth
  // there's a redirect to their site
  if (!tokenFromIDX && tokenIsCached) {
    const encoder = new TextEncoder();
    const encodedToken = encoder.encode(cachedToken);
    const jwe = await Auth.idx.ceramic.did.createJWE(encodedToken, [
      Auth.idx.ceramic.did.id,
    ]);
    const params = {
      github: { accessToken: jwe },
    };

    await Auth.set("authentication", params);
    return;
  }

  // If token is stored in IDX, update local state
  // This will allow the user to refresh the app, and
  // when it connects to the blockchain provider
  // the token will be loaded locally
  if (tokenFromIDX && !tokenIsCached) {
    const token = await Auth.idx.ceramic.did.decryptJWE(tokenFromIDX);
    const encoder = new TextDecoder();
    const decoded = encoder.decode(token);
    dispatch({
      type: "SET_GITHUB_USER",
      payload: decoded,
    });
  }
};

export interface Favorites {
  [key: string]: string[];
  ens: string[];
  ipfs: string[];
}

export const toggleFavorite = async (
  api: APIData,
  currentFavorites: Favorites,
  dispatch: Dispatch<StateAction>
) => {
  const favList = [...currentFavorites.ens, ...currentFavorites.ipfs];
  const newFavorites: Favorites = {
    ens: currentFavorites.ens ?? [],
    ipfs: currentFavorites.ipfs ?? [],
  };

  const apiUris = [
    { uri: api.locationUri, uriTypeId: API_URI_TYPE_ID.ipfs },
    ...api.apiUris,
  ];
  const favUriDict: [string, string][] = [];
  const alreadyFavorite = apiUris
    .map((apiUri) => {
      const boolArr = favList.filter((favUri) => {
        if (favUri === apiUri.uri) {
          favUriDict.push([apiUri.uri, apiUri.uriTypeId]);
          return true;
        }
        return false;
      });
      return !!boolArr.length;
    })
    .filter(Boolean);
  if (alreadyFavorite.length) {
    favUriDict.map((fav) => {
      const type = API_URI_TYPE_ID[fav[1]];
      const index = newFavorites[type].findIndex((uri) => fav[0] === uri);
      if (index !== -1) {
        newFavorites[type] = newFavorites[type]
          .slice(0, index)
          .concat(newFavorites[type].slice(index + 1));
      }
    });
  } else {
    for (const uri of apiUris) {
      const type = API_URI_TYPE_ID[uri.uriTypeId];
      newFavorites[type].push(uri.uri);
    }
  }
  dispatch({ type: "SET_FAVORITE_APIS", payload: newFavorites });
};
