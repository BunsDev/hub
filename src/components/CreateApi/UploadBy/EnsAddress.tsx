/** @jsxImportSource theme-ui **/
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
} from "react";
import Input from "../../Input";
import { MAIN_DOMAIN, ZERO_ADDRESS } from "../../../constants";
import { getOwner } from "../../../services/ens/getOwner";
import { useStateValue } from "../../../state/state";
import ErrorMsg from "../ErrorMsg";
import NavButtons from "../NavButtons";
import { Wrapper } from "../Wrapper";
import Spinner from "../../Spinner";
import { Button, Image, Flex } from "@theme-ui/components";
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
        } else {
          dispatch({ type: "setsubdomainLookupSuccess", payload: false });
          dispatch({
            type: "setsubdomainError",
            payload: "Subdomain name is not available",
          });
        }
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "setsubdomainLoading", payload: false });
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
    publish.subdomain && checkForENSAvailability(publish.subdomain);
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

  console.log(publish);
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
        <div className={"inputwrap"}>
          <Input
            type="text"
            name="ens"
            placeholder="ksc787wkbnlscv7sdclsvl;s;..."
            required
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
