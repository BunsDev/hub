import axios from "axios";
import { domain } from "src/constants";
import { parseApiUri } from "utils/pathResolvers";

export default async (inputUri: string) => {
  const [uri] = parseApiUri(inputUri);
  const { data } = await axios.get<{ published: string }>(
    domain + "/api/apis/find",
    {
      params: { uri: uri },
    }
  );
  return data?.published;
};
