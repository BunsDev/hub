/** @jsxImportSource theme-ui **/
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { Flex, Button, Themed, Image } from "theme-ui";
import {
  useRouter,
  useAuth,
  useToggle,
  useStateValue,
  useRegisterEns,
} from "hooks";
import { Wrapper } from "components/PublishWrapper";
import { Input, Modal, Spinner } from "components";
import stripIPFSPrefix from "utils/stripIPFSPrefix";
import { ipfsGateway, domain, MAIN_DOMAIN } from "../../constants";

import styles from "./styles";

const PublishAPI = () => {
  const [{ dapp, publish }, dispatch] = useStateValue();
  const [showSignInModal, setShowSignInModal] = useState(false);
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
    if (publish.apiData) {
      const body = {
        name: publish.apiData.name,
        description: publish.apiData.description,
        subtext: publish.apiData.subtext,
        icon: publish.apiData.icon,
        locationUri: publish.ipfs,
        did: dapp.did,
        apiUris: [] as string[],
      };
      if (publish.subdomain) {
        body.apiUris = [`${publish?.subdomain}.${MAIN_DOMAIN}`];
      }
      await fetch(domain + "/api/apis/publish", {
        method: "POST",
        body: JSON.stringify(body),
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
  const handleOnAddEns: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (dapp.address) {
      toggleEnsInput(true);
    } else {
      setShowSignInModal(true);
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
  };


  useEffect(() => {
    if (!dapp.did) void authenticate();
  }, [dapp.did]);

  useEffect(() => {
    if (!dapp.address) {
      toggleEnsInput(false);
    }
  }, [dapp.address]);

  const ensRegStatus = ensRegLoading
    ? "loading"
    : ensRegErrors?.length
    ? "error"
    : publish.subdomainRegisterSuccess
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
    error: (
      <Flex sx={styles.successIcon}>
        <Image src="/images/fail.svg" alt="error" />
      </Flex>
    ),
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
                  onClick={handleOnAddEns}
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
            disabled={publish.ipfs.length === 0}
          >
            Publish
          </Button>
        </Flex>
      </form>
      {showSignInModal && (
        <div sx={{ position: "fixed", top: 0, left: 0, zIndex: 100000 }}>
          <Modal
            screen={"connect"}
            noLeftShift
            close={() => {
              setShowSignInModal(false);
              toggleEnsInput(true);
            }}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default PublishAPI;
