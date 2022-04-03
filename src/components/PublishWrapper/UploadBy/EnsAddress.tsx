/** @jsxImportSource theme-ui **/
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import { Button, Image, Flex } from "@theme-ui/components";
import { useStateValue } from "hooks";
import { Spinner, Input } from "components";
import { Wrapper, NavButtons, ErrorMsg } from "components/PublishWrapper";

import styles from "../styles";
import { useWeb3ApiClient } from "@web3api/react";
import { networks } from "utils/networks";
import Select from "react-dropdown-select";
import getMetaDataFromPackageUri from "services/ipfs/getMetaDataPackageUri";
import findPublishedApi from "utils/api/findPublishedApi";
import { ErrorDuplicateApi, getInputSuffix } from "./shared";

export const EnsAddress = () => {
  const [{ dapp, publish }, dispatch] = useStateValue();
  const client = useWeb3ApiClient();

  const [ensNetwork, setEnsNetwork] = useState(
    dapp.network
      ? [{ network: networks[dapp.network].name }]
      : [{ network: "mainnet" }]
  );

  const handleSubdomainChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({ type: "setsubdomain", payload: e.target.value });
    dispatch({ type: "setsubdomainError", payload: "" });
    dispatch({ type: "setsubdomainLookupSuccess", payload: false });
  };

  const handleApplyButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: "setsubdomainLoading", payload: true });

      const publishedApiUri = await findPublishedApi(publish.subdomain);

      if (Boolean(publishedApiUri)) {
        dispatch({ type: "setsubdomainLoading", payload: false });
        dispatch({ type: "setApiData", payload: null });
        dispatch({
          type: "setsubdomainError",
          //@ts-ignore
          payload: <ErrorDuplicateApi uri={publishedApiUri} />,
        });
        return;
      }

      const path = `ens/${ensNetwork[0].network}/${publish.subdomain}`;
      const resolved = await client.resolveUri(path);
      if (!resolved.api) {
        dispatch({ type: "setsubdomainLoading", payload: false });
        dispatch({
          type: "setsubdomainError",
          payload: "No Api found at provided ENS address",
        });
      }
      if (resolved?.uri?.path) {
        dispatch({ type: "setipfs", payload: resolved.uri.path });

        const metaData = await getMetaDataFromPackageUri(client, path);

        if (!metaData) {
          dispatch({ type: "setsubdomainLoading", payload: false });
          dispatch({ type: "setApiData", payload: null });
          dispatch({
            type: "setsubdomainError",
            payload: "No Package available",
          });
        } else {
          dispatch({ type: "setsubdomainLoading", payload: false });
          dispatch({ type: "setsubdomainLookupSuccess", payload: true });
          dispatch({ type: "setApiData", payload: metaData });
        }
      }
    } catch (e) {
      dispatch({ type: "setsubdomainLoading", payload: false });
      dispatch({
        type: "setsubdomainError",
        payload: e?.message || e.toString(),
      });
    }
  };

  const subdomainStatus = publish.subdomainLookupSuccess
    ? "success"
    : publish.subdomainLoading
    ? "loading"
    : publish.subdomainError
    ? "error"
    : "none";

  const inputSuffix = getInputSuffix({ applyButtonHandler: handleApplyButton });

  return (
    <Wrapper>
      <div className="fieldset">
        <label className="subtitle-1">Input ENS Name</label>
        <div className="inputwrap">
          <Input
            type="text"
            name="ens"
            placeholder="example.eth"
            style={{ paddingLeft: "0" }}
            required
            value={publish.subdomain}
            onChange={handleSubdomainChange}
            suffix={inputSuffix[subdomainStatus]}
            prefix={
              <Select
                style={{
                  border: "none",
                  paddingRight: "0",
                  boxShadow: "none",
                }}
                sx={styles.networkSelect}
                labelField="network"
                valueField="network"
                values={ensNetwork}
                dropdownGap={0}
                direction="rtl"
                options={Object.keys(networks).map((key) => ({
                  network: networks[key].name,
                }))}
                onChange={setEnsNetwork}
                searchable={false}
              />
            }
          />
        </div>
        <ErrorMsg>{publish.subdomainError}</ErrorMsg>
      </div>
      <NavButtons continueEnabled={publish.subdomainLookupSuccess} />
    </Wrapper>
  );
};

export default EnsAddress;
