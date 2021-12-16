import { Favorites } from "services/ceramic/handlers";

export function listFavorites(favorites: Favorites) {
  const listed: { [key: string]: boolean } = {};
  const keys = Object.keys(favorites);
  keys.forEach((key) =>
    favorites[key].forEach((i) => {
      listed[i] = true;
    })
  );
  return listed;
}
