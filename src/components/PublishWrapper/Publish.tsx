/** @jsxImportSource theme-ui **/
import {
  ChangeEventHandler,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { Flex, Button, Themed, Image } from "theme-ui";
import { useRouter, useAuth, useStateValue, useRegisterEns } from "hooks";
import { Wrapper } from "components/PublishWrapper";
import { Input, Spinner } from "components";
import { domain, ipfsGateway } from "../../constants";

import styles from "./styles";
import useModal from "hooks/useModal";
import {
  constructPublishBodyFromMeta,
  publishFromMeta,
  publishWrapper,
} from "utils/publishFromMeta";

const PublishAPI = () => {
  const [{ dapp, publish }, dispatch] = useStateValue();
  const [ensInputVisible, toggleEnsInput] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const { openModal: openAuthModal } = useModal("connect", {
    onClose: () => toggleEnsInput(true),
  });

  const [executeRegisterENS, { loading: ensRegLoading, errors: ensRegErrors }] =
    useRegisterEns();

  const { authenticate } = useAuth(dapp);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (publish.apiData) {
      const body = constructPublishBodyFromMeta(publish.apiData);

      if (dapp?.did) body.did = dapp.did;
      if (publish.ipfs) body.locationUri = publish?.ipfs;
      if (publish.subdomainRegisterSuccess && publish.subdomain)
        body.apiUris = [publish?.subdomain];

      try {
        setPublishLoading(true);
        const response = await publishWrapper(body);

        if (response.ok) {
          const redirect = `/info?uri=${
            publish?.subdomain
              ? `ens/${publish.subdomain}`
              : `ipfs/${publish.ipfs}`
          }`;
          dispatch({ type: "setipfs", payload: "" });
          dispatch({ type: "setsubdomain", payload: "" });
          dispatch({ type: "setsubdomainRegisterSuccess", payload: false });
          router.push(redirect);
        } else {
          throw Error(response.statusText);
        }
        setPublishLoading(false);
      } catch (e) {
        setPublishLoading(false);
      }
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
    dapp.address ? toggleEnsInput(true) : openAuthModal();
  };

  const handleEnsInputChange: ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    dispatch({ type: "setsubdomain", payload: e.target.value });
    dispatch({ type: "setsubdomainError", payload: null });
  };

  const handleENSRegistration: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    publish.subdomain && (await executeRegisterENS());
  };

  useEffect(() => {
    if (!dapp.did) void authenticate();
  }, [dapp.did]);

  useEffect(() => {
    !dapp.address && toggleEnsInput(false);
  }, [dapp.address]);

  const ensRegStatus = ensRegLoading
    ? "loading"
    : publish.subdomainError
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

  const iconSrc =
    //@ts-ignore
    publish?.apiData?.iconSrc || publish.apiData.icon
      ? `${ipfsGateway}${publish.ipfs}${publish.apiData.icon.replace(
          "./",
          "/"
        )}`
      : "";

  return (
    <Wrapper>
      <form
        onSubmit={handleSubmit}
        onInvalid={handleInvalid}
        sx={styles.publish}
      >
        <Flex className="publish_wrap">
          <div className="image_wrap">
            {publish.apiData && <img src={iconSrc} />}
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
              {ensInputVisible ? (
                <>
                  <label className="subtitle-1">ENS Name</label>
                  <Input
                    value={publish?.subdomain}
                    onChange={handleEnsInputChange}
                    suffix={ensRegInputSuffix[ensRegStatus]}
                  />
                  {!!ensRegErrors.length &&
                    ensRegErrors.map((er) => (
                      <span sx={{ color: "red", maxWidth: "100%" }}>
                        {er.message}
                      </span>
                    ))}
                </>
              ) : (
                <Button
                  variant="primaryMedium"
                  className="btn-add-ens"
                  onClick={handleOnAddEns}
                >
                  Add ENS Name
                </Button>
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
            disabled={publish.ipfs.length === 0 || publishLoading}
            sx={{ maxHeight: "36px", width: "92px", img: { height: "200%" } }}
          >
            {publishLoading ? <Spinner /> : "Publish"}
          </Button>
        </Flex>
      </form>
    </Wrapper>
  );
};

export default PublishAPI;
