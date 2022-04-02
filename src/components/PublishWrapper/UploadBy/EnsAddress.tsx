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
import Link from "next/link";
import { domain } from "src/constants";

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

      console.log("sbd", publish.subdomain);
      const publishedApiUri = await findPublishedApi(publish.subdomain);

      if (Boolean(publishedApiUri)) {
        dispatch({ type: "setsubdomainLoading", payload: false });
        dispatch({ type: "setApiData", payload: null });
        dispatch({
          type: "setsubdomainError",
          //@ts-ignore
          payload: (
            <>
              Package already published. Please visit{" "}
              <Link href={`${domain}/info?uri=${publishedApiUri}`}>
                <a>package details page</a>
              </Link>
            </>
          ),
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
    error: (
      <Flex sx={styles.successIcon}>
        <Image src="/images/fail.svg" alt="error" />
      </Flex>
    ),
  };

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
                sx={{
                  border: "none",
                  ".react-dropdown-select-content": {
                    width: "70px",
                    ".react-dropdown-select-input": {
                      display: "none",
                    },
                    "&:before": {
                      display: "block",
                      content: '"/"',
                    },
                  },
                  ".react-dropdown-select-dropdown": {
                    bg: "polyGrey3",
                    borderRadius: "8px",
                    border: "none",
                    marginTop: "8px",
                    ".react-dropdown-select-item": {
                      textAlign: "left",
                      border: "none",
                    },
                    ".react-dropdown-select-item-selected": {
                      bg: "polyGrey2",
                    },
                  },
                }}
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
        {publish.subdomainError && (
          <ErrorMsg bottomshift>{publish.subdomainError}</ErrorMsg>
        )}
      </div>
      <NavButtons continueEnabled={publish.subdomainLookupSuccess} />
    </Wrapper>
  );
};

export default EnsAddress;
