/** @jsxImportSource theme-ui **/
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
} from "react";
import { Flex, Button, Themed, Image } from "theme-ui";
import {
  useRouter,
  useAuth,
  useToggle,
  useStateValue,
  useRegisterEns,
  useCreateSubdomain,
} from "hooks";
import { Wrapper } from "components/PublishWrapper";
import { Input, LoadingSpinner, Spinner } from "components";
import stripIPFSPrefix from "utils/stripIPFSPrefix";
import { ipfsGateway, domain, MAIN_DOMAIN } from "../../constants";

import styles from "./styles";

const PublishAPI = () => {
  const [{ dapp, publish }, dispatch] = useStateValue();
  const [ensInputVisible, toggleEnsInput] = useToggle(
    Boolean(publish.subdomain)
  );

  const [
    executeRegisterENS,
    { data: ensRegData, errors: ensRegErrors, loading: ensRegLoading },
  ] = useRegisterEns();

  const { authenticate } = useAuth(dapp);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (publish.apiData && publish.subdomain.length > 0) {
      await fetch(domain + "/api/apis/publish", {
        method: "POST",
        body: JSON.stringify({
          name: publish.apiData.name,
          description: publish.apiData.description,
          subtext: publish.apiData.subtext,
          icon: publish.apiData.icon,
          locationUri: publish.ipfs,
          apiUris: [`${publish.subdomain}.${MAIN_DOMAIN}`],
          did: dapp.did,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "setShowSuccessModal", payload: true });
    }
  };

  const handleInvalid: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if ((e.target as HTMLFormElement).name === "ipfs") {
      dispatch({
        type: "setipfsError",
        payload: "Please enter a valid IPFS hash",
      });
    }
    if ((e.target as HTMLFormElement).name === "ens") {
      dispatch({
        type: "setsubdomainError",
        payload: "Please enter a valid ENS sub-domain",
      });
    }
  };

  const handleEnsInputChange: ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    dispatch({ type: "setsubdomain", payload: e.target.value });
  };

  const handleENSRegistration: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    await executeRegisterENS();
    //await execute(publish.subdomain, publish.ipfs);
  };

  /* useEffect(() => {
    if (status === 3) {
      dispatch({ type: "setsubdomainRegisterSuccess", payload: true });
    }
  }, [status]); */

  useEffect(() => {
    if (!dapp.did) void authenticate();
  }, [dapp.did]);

  const ensRegStatus = ensRegLoading
    ? "loading"
    : ensRegErrors?.length
    ? "error"
    : ensRegData.data
    ? "success"
    : "none";

  const ensRegInputSuffix = {
    none: (
      <Button
        variant="suffixSmall"
        className="btn-save-ens"
        onClick={handleENSRegistration}
      >
        Save
      </Button>
    ),
    success: (
      <Flex sx={styles.successIcon}>
        <Image src="/images/success.svg" alt="success" />
      </Flex>
    ),
    loading: (
      <Flex sx={styles.loadingIcon}>
        <Spinner />
      </Flex>
    ),
    error: <div style={{ width: "65px" }} />,
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} onInvalid={handleInvalid}>
        <Flex className="publish" sx={styles.publish}>
          <div className="image_wrap">
            {publish.apiData && (
              <img
                src={`${ipfsGateway}${
                  publish.ipfs || stripIPFSPrefix(publish.apiData.locationUri)
                }${publish.apiData.icon.replace("./", "/")}`}
              />
            )}
          </div>
          <div className="inputs">
            <div>
              <label className="subtitle-1">IPFS</label>
              <Input
                value={publish?.ipfs}
                disabled
                suffix={
                  <Flex className="succes-icon-wrap">
                    <Image src="/images/success.svg" alt="success" />
                  </Flex>
                }
              />
            </div>
            <div>
              {!publish.subdomain && !ensInputVisible && (
                <Button
                  variant="primaryMedium"
                  className="btn-add-ens"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleEnsInput(true);
                  }}
                >
                  Add ENS Name
                </Button>
              )}
              {ensInputVisible && (
                <>
                  <label className="subtitle-1">ENS Name</label>
                  <Input
                    value={publish?.subdomain}
                    onChange={handleEnsInputChange}
                    suffix={ensRegInputSuffix[ensRegStatus]}
                  />
                </>
              )}
            </div>
          </div>
          <div className="info">
            {publish?.apiData?.name && (
              <Themed.h2>{publish?.apiData?.name}</Themed.h2>
            )}
            {publish?.apiData?.description && (
              <p className="body-1">{publish?.apiData?.description}</p>
            )}
          </div>
        </Flex>
        <Flex className="buttons">
          <Button
            variant="secondaryMedium"
            sx={{ mr: "16px" }}
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            Back
          </Button>
          <Button
            variant="primaryMedium"
            type="submit"
            disabled={
              publish.subdomain.length === 0 || publish.ipfs.length === 0
            }
          >
            Publish
          </Button>
        </Flex>
      </form>
    </Wrapper>
  );
};

export default PublishAPI;
