import { useLocalStorage, useStateValue } from "hooks";
import { useEffect, useState } from "react";
import Auth from "services/ceramic/auth";
import { Favorites } from "services/ceramic/handlers";
import { API_URI_TYPE_ID } from "src/constants";
import { APIData } from "./ens/useGetAPIfromENS";

export default function useFavorites() {
  const [{ dapp }, dispatch] = useStateValue();
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [cachedFavorites, setCachedFavorites] = useLocalStorage("favorites", {
    [dapp?.did]: {
      ens: [],
      ipfs: [],
    },
  });

  useEffect(() => {
    const getFavorites = async () => {
      const favorites = (await Auth.get("favorites")) as Favorites;
      if (favorites) {
        setCachedFavorites({...cachedFavorites, [dapp?.did]: favorites });
        dispatch({
          type: "SET_FAVORITE_APIS",
          payload: favorites,
        });
      }
      setFetchSuccess(true);
    };
    if (dapp.web3 && Auth.ceramic.did?.authenticated) {
      getFavorites();
    }
  }, [dapp.web3, Auth.ceramic.did?.authenticated]);

  useEffect(() => {
    if (!dapp.address) {
      dispatch({ type: "SET_FAVORITE_APIS", payload: { ens: [], ipfs: [] } });
    }
  }, [dapp?.address]);
  useEffect(() => {
    const setFavorites = async () => {
      await Auth.set("favorites", dapp.favorites);
      console.log('favorites set')
    };
    if (
      fetchSuccess &&
      JSON.stringify(dapp.favorites) !==
        JSON.stringify(cachedFavorites[dapp?.did])
    ) {
      setCachedFavorites({...cachedFavorites, [dapp?.did]: dapp.favorites });
      if (dapp.web3 && Auth.ceramic.did?.authenticated) {
        setFavorites();
      }
    }
  }, [dapp.favorites]);

  const toggleFavorite = (api: APIData) => {
    const currentFavorites = [...dapp.favorites.ens, ...dapp.favorites.ipfs];
    const newFavorites: Favorites = {
      ens: dapp.favorites.ens ?? [],
      ipfs: dapp.favorites.ipfs ?? [],
    };

    const favUriDict: [string, string][] = [];
    const alreadyFavorite = api.apiUris
      .map((apiUri) => {
        const boolArr = currentFavorites.filter((favUri) => {
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
      for (const uri of api.apiUris) {
        const type = API_URI_TYPE_ID[uri.uriTypeId];
        newFavorites[type].push(uri.uri);
      }
    }
    dispatch({ type: "SET_FAVORITE_APIS", payload: newFavorites });
  };

  return { toggleFavorite };
}
