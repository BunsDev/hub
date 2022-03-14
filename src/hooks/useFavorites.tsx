import React, { createContext, useContext, useEffect, useState } from "react";
import { IDX } from "@ceramicstudio/idx";
import { useStateValue } from "src/state/state";
import { Favorites } from "services/ceramic/handlers";
import { APIData } from "./ens/useGetAPIfromENS";
import { API_URI_TYPE_ID } from "src/constants";

type FavoritesContext = {
  getSuccess: boolean;
  toggleFavorite: (api: APIData) => void;
};
export const FavoritesContext = createContext<FavoritesContext>({
  getSuccess: false,
  toggleFavorite: () => null,
});

export const FavortitesProvider = ({
  idx,
  children,
}: {
  idx: IDX;
  children: React.ReactNode;
}) => {
  const [{ dapp }, dispatch] = useStateValue();

  const [getSuccess, setGetSuccess] = useState(false);

  useEffect(() => {
    const getFavorites = async () => {
      const favorites = (await idx.get("favorites")) as Favorites;
      if (favorites) {
        dispatch({
          type: "SET_FAVORITE_APIS",
          payload: favorites,
        });
      }
      setGetSuccess(true);
    };
    if (idx) {
      getFavorites();
    }
  }, [idx]);

  useEffect(() => {
    if (!dapp.address) {
      dispatch({ type: "SET_FAVORITE_APIS", payload: { ens: [], ipfs: [] } });
    }
  }, [dapp?.address]);

  const setFavorites = async (favorites: Favorites) => {
    await idx.set("favorites", favorites);
    console.log("favorites set");
  };

  const toggleFavorite = (api: APIData) => {
    const currentFavorites = [...dapp.favorites.ens, ...dapp.favorites.ipfs];
    const newFavorites: Favorites = {
      ens: dapp.favorites.ens ?? [],
      ipfs: dapp.favorites.ipfs ?? [],
    };

    const favUriDict: [string, string][] = [];
    const apiUris = [
      ...api.apiUris,
      { uri: api.locationUri, uriTypeId: API_URI_TYPE_ID.ipfs },
    ];
    const alreadyFavorite = apiUris
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
      for (const uri of apiUris) {
        const type = API_URI_TYPE_ID[uri.uriTypeId];
        newFavorites[type].push(uri.uri);
      }
    }
    dispatch({ type: "SET_FAVORITE_APIS", payload: newFavorites });
    setFavorites(newFavorites);
  };

  return idx ? (
    <FavoritesContext.Provider value={{ getSuccess, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  ) : (
    <>{children}</>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
