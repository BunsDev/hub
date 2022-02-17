/** @jsxImportSource theme-ui **/
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
} from "react";
import { Button, Image, Flex } from "@theme-ui/components";
import { useStateValue } from "hooks";
import { Spinner, Input } from "components";
import { Wrapper, NavButtons, ErrorMsg } from "components/PublishWrapper";

import styles from "../styles";
import { useWeb3ApiClient } from "@web3api/react";
import getMetaDataFromPackageHash from "services/ipfs/getMetaDataFromPackageHash";


export const EnsAddress = () => {
  const [{ dapp, publish }, dispatch] = useStateValue();
  const client = useWeb3ApiClient();

  const handleSubdomainChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({ type: "setsubdomain", payload: e.target.value });
    dispatch({ type: "setsubdomainError", payload: "" });
    dispatch({ type: "setsubdomainLookupSuccess", payload: false });
  };

  const handleApplyButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: "setsubdomainLoading", payload: true });

      const resolved = await client.resolveUri("ens/" + publish.subdomain);
      if (!resolved.api) {
        dispatch({ type: "setsubdomainLoading", payload: false });
        dispatch({
          type: "setsubdomainError",
          payload: 'No Api found at provided ENS address',
        });
      }
      if (resolved?.uri?.path) {
        dispatch({ type: "setipfs", payload: resolved.uri.path });
        console.log("resolved", resolved);

        const metaData = await getMetaDataFromPackageHash(publish.ipfs);
        console.log("metaData", metaData);

        if (metaData === undefined || metaData === "NO METADATA FOUND") {
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
    ? "available"
    : publish.subdomainRegisterSuccess
    ? "registered"
    : publish.subdomainLoading
    ? "loading"
    : publish.subdomainError
    ? "error"
    : "none";

  //subdomainRegisterSuccess

  const inputSuffix: { [key: string]: JSX.Element } = {
    none: (
      <Button
        variant="suffixSmall"
        sx={styles.suffixButton}
        onClick={handleApplyButton}
      >
        Apply
      </Button>
    ),
    available: (
      <Flex sx={{ width: "65px", justifyContent: "center" }}>
        <Image src="/images/success.svg" alt="success" sx={{}} />
      </Flex>
    ),
    loading: (
      <Flex sx={{ width: "65px", height: "100%", justifyContent: "center" }}>
        <Spinner />
      </Flex>
    ),
    error: <div style={{ width: "65px" }} />,
  };

  return (
    <Wrapper>
      <div className="fieldset">
        <label className="subtitle-1">Input ENS Name</label>
        <div className="inputwrap">
          <Input
            type="text"
            name="ens"
            placeholder="ksc787wkbnlscv7sdclsvl;s;..."
            required
            value={publish.subdomain}
            onChange={handleSubdomainChange}
            suffix={inputSuffix[subdomainStatus]}
          />
        </div>
        {publish.subdomainError && (
          <ErrorMsg bottomshift>{publish.subdomainError}</ErrorMsg>
        )}
      </div>
      <NavButtons continueEnabled={publish.subdomainLookupSuccess} />
    </Wrapper>
  );
};

export default EnsAddress;
