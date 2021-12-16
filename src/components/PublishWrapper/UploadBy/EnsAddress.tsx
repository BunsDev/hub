/** @jsxImportSource theme-ui **/
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
} from "react";
import { Button, Image, Flex } from "@theme-ui/components";
import { getOwner } from "services/ens/getOwner";
import { useStateValue } from "hooks";
import { Spinner, Input } from "components";
import { Wrapper, NavButtons, ErrorMsg } from "components/PublishWrapper";
import { MAIN_DOMAIN, ZERO_ADDRESS } from "../../../constants";

import styles from "./styles";

export const EnsAddress = () => {
  const [{ dapp, publish }, dispatch] = useStateValue();

  useEffect(() => {
    if (publish.subdomain !== "") {
      void checkForENSAvailability(publish.subdomain);
    }
  }, [dapp.address]);

  const checkForENSAvailability = useCallback(
    async (label: string) => {
      dispatch({ type: "setsubdomainLoading", payload: true });
      try {
        const owner = await getOwner(`${label}.${MAIN_DOMAIN}`, dapp.web3);
        if (owner === ZERO_ADDRESS) {
          dispatch({ type: "setsubdomainLookupSuccess", payload: true });
          dispatch({ type: "setsubdomainError", payload: "" });
          return true;
        } else {
          dispatch({ type: "setsubdomainLookupSuccess", payload: false });
          dispatch({
            type: "setsubdomainError",
            payload: "Subdomain name is not available",
          });
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      } finally {
        dispatch({ type: "setsubdomainLoading", payload: false });
      }
    },
    [dapp.web3]
  );

  const handleSubdomainChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({ type: "setsubdomain", payload: e.target.value });
    dispatch({ type: "setsubdomainError", payload: "" });
    dispatch({ type: "setsubdomainLookupSuccess", payload: false });
  };
  const handleApplyButton: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const ensAvailable = await checkForENSAvailability(publish.subdomain);
    if (ensAvailable) {
      /* GET IPFS HASH AND INPUT IT HERE
      const networkName = networks[dapp?.network]?.name || "mainnet";
      const meta = await client.getManifest(
        `ens/${networkName}/${publish.subdomain}`,
        {
          type: "meta",
        }
      );
      const { name, description, icon,  } = meta;
      const obj: APIDataFromManifest = {
        description,
        icon,
        name,
        apiUris: [`${location}/${uri}`],
      };
      const metaData = await getMetaDataFromPackageHash(publish.ipfs);
      dispatch({ type: "setApiData", payload: metaData });


      dispatch({ type: "setApiData", payload: obj });
      */
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
