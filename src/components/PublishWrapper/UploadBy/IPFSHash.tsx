/** @jsxImportSource theme-ui **/
import { ChangeEventHandler, MouseEventHandler } from "react";
import { Flex, Image, Button } from "theme-ui";
import getMetaDataFromPackageUri from "services/ipfs/getMetaDataPackageUri";
import { useStateValue } from "hooks";
import { Wrapper, NavButtons, ErrorMsg } from "components/PublishWrapper";
import { Spinner, Input } from "components";

import styles from "../styles";
import { useWeb3ApiClient } from "@web3api/react";
import { parseApiUri } from "utils/pathResolvers";
import findPublishedApi from "utils/api/findPublishedApi";
import { ErrorDuplicateApi, getInputSuffix } from "./shared";

export const IPFSHash = () => {
  const [{ publish }, dispatch] = useStateValue();
  const client = useWeb3ApiClient();

  const handleIPFSHashInput: ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    dispatch({ type: "setipfsError", payload: "" });
    dispatch({ type: "setipfs", payload: e.target.value });
  };

  const handleApplyButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (publish.ipfs !== "") {
      dispatch({ type: "setipfsLoading", payload: true });

      const publishedApiUri = await findPublishedApi(publish.ipfs);

      if (Boolean(publishedApiUri)) {
        dispatch({ type: "setipfsLoading", payload: false });
        dispatch({ type: "setApiData", payload: null });
        dispatch({
          type: "setipfsError",
          //@ts-ignore
          payload: <ErrorDuplicateApi uri={publishedApiUri} />,
        });
        return;
      }
      const parsedHash = parseApiUri(publish.ipfs).reverse().join("/");

      const metadata = await getMetaDataFromPackageUri(client, parsedHash);

      if (!metadata) {
        dispatch({ type: "setipfsLoading", payload: false });
        dispatch({ type: "setApiData", payload: null });
        dispatch({ type: "setipfsError", payload: "No Package available" });
      } else {
        const { uri } = await client.resolveUri(parsedHash);
        dispatch({ type: "setipfsLoading", payload: false });
        dispatch({ type: "setipfs", payload: uri.path });
        dispatch({ type: "setipfsSuccess", payload: true });
        dispatch({ type: "setApiData", payload: metadata });
      }
    } else {
      dispatch({ type: "setipfsLoading", payload: false });
    }
  };

  const ipfsStatus = publish.ipfsLoading
    ? "loading"
    : publish.ipfsSuccess
    ? "success"
    : publish.ipfsError
    ? "error"
    : "none";

  const inputSuffix = getInputSuffix({ applyButtonHandler: handleApplyButton });

  return (
    <Wrapper>
      <div className="fieldset">
        <label className="subtitle-1">Input IPFS</label>
        <div className="inputwrap">
          <Input
            type="text"
            name="ipfs"
            placeholder="QmPBWKRhX9aqQh4zsn..."
            required
            pattern="^Qm[1-9A-HJ-NP-Za-km-z]{44}(\/.*)?|^\/ipns\/.+"
            onChange={handleIPFSHashInput}
            value={publish.ipfs}
            disabled={publish.ipfsSuccess}
            suffix={inputSuffix[ipfsStatus]}
          />
        </div>
        <ErrorMsg>{publish.ipfsError}</ErrorMsg>
      </div>
      <NavButtons continueEnabled={publish.ipfsSuccess} />
    </Wrapper>
  );
};

export default IPFSHash;
