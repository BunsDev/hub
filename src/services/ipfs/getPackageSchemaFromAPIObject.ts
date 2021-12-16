import { cloudFlareGateway } from "../../constants";
import { APIData } from "../../hooks/ens/useGetAPIfromENS";

import axios from "axios";

export default async function getPackageSchema(api: APIData): Promise<string> {
  const schemaResponse = await axios.get(
    `${cloudFlareGateway}${api.apiUris[0].uri}/schema.graphql`
  );
  return schemaResponse.data;
}
