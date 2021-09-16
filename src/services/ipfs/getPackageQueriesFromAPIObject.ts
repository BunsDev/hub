import { cloudFlareGateway } from "../../constants";
import { APIData } from "../../hooks/ens/useGetAPIfromENS";
import get_CFG_UI_DOM from "../../utils/get_CFG_UI_DOM";

import { Element } from "cheerio";
import axios from "axios";

export interface QueryAttributes {
  id: string;
  value: string;
  recipe?: string;
}

const getInfo = async (
  row: Element,
  folder: string
): Promise<QueryAttributes> => {
  const queryData = await axios.get(
    `${cloudFlareGateway.replace("/ipfs/", "")}${row.attribs.href}`
  );
  const key = row.attribs.href.split(`meta/${folder}/`)[1].split(".graphql")[0];
  return { id: key, value: queryData.data };
};

const getPackageQueries = async (api: APIData): Promise<QueryAttributes[]> => {
  const $queries = await get_CFG_UI_DOM(api, "/meta/queries");
  const queriesInformation = Array.from($queries("table tr td:nth-child(2) a"));
  queriesInformation.shift(); // dump .. in row 1

  const queries = await Promise.all(
    queriesInformation.map((q) => getInfo(q, "queries"))
  );

  const recipes = await getPackageRecipes(api);

  return queries.map((query) => {
    const recipeOfQuery = recipes.find((r) => {
      const [recipeName] = r.id.split(".json");
      return recipeName === query.id;
    });

    if (recipeOfQuery) {
      return {
        ...query,
        recipe: recipeOfQuery.value,
      };
    }
    return query;
  });
};

async function getPackageRecipes(api: APIData): Promise<QueryAttributes[]> {
  try {
    const $recipes = await get_CFG_UI_DOM(api, "/meta/recipes");
    const recipesInformation = Array.from(
      $recipes("table tr td:nth-child(2) a")
    );
    recipesInformation.shift();

    const recipes = await Promise.all(
      recipesInformation.map((r) => getInfo(r, "recipes"))
    );
    return recipes;
  } catch {
    return [];
  }
}

export default getPackageQueries;
