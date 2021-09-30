/** @jsxImportSource theme-ui **/
import { ipfsGateway, domain, MAIN_DOMAIN } from "../../constants";
import styles from "./styles";

import { FormEventHandler, useEffect } from "react";
import { Flex, Button, Themed, Image } from "theme-ui";
import {
  useRouter,
  useAuth,
  useToggle,
  useResponsive,
  useStateValue,
  useCreateSubdomain,
} from "hooks";
import { Wrapper } from "components/PublishWrapper";
import { Input } from "components";
import stripIPFSPrefix from "utils/stripIPFSPrefix";

const PublishAPI = () => {
  const [{ dapp, publish }, dispatch] = useStateValue();
  const {
    mobile: { isMobile },
  } = useResponsive();
  const [ensInputVisible, toggleEnsInput] = useToggle(
    Boolean(publish.subdomain)
  );
  const [executeCreateSubdomain, { status }] = useCreateSubdomain();
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
          pointerUris: [`${publish.subdomain}.${MAIN_DOMAIN}`],
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

  useEffect(() => {
    if (status === 3) {
      dispatch({ type: "setsubdomainRegisterSuccess", payload: true });
    }
  }, [status]);

  useEffect(() => {
    if (publish.subdomain !== "" && publish.ipfs !== "") {
      void executeCreateSubdomain(publish.subdomain, publish.ipfs);
    }
  }, [dapp.address]);

  useEffect(() => {
    if (!dapp.did) void authenticate();
  }, [dapp.did]);

  const blocks = {
    image: (
      <div className="image_wrap">
        {publish.apiData && (
          <img
            src={`${ipfsGateway}${
              publish.ipfs || stripIPFSPrefix(publish.apiData.locationUri)
            }${publish.apiData.icon.replace("./", "/")}`}
          />
        )}
      </div>
    ),
    inputs: (
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
                disabled
                suffix={
                  <Button
                    variant="suffixSmall"
                    className="btn-save-ens"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    Save
                  </Button>
                }
              />
            </>
          )}
        </div>
      </div>
    ),
    info: (
      <div className="info">
        {publish?.apiData?.name && (
          <Themed.h2>{publish?.apiData?.name}</Themed.h2>
        )}
        {publish?.apiData?.description && (
          <p className="body-1">{publish?.apiData?.description}</p>
        )}
      </div>
    ),
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} onInvalid={handleInvalid}>
        <Flex className="publish" sx={styles.publish}>
          {isMobile ? (
            <>
              {blocks.info}
              {blocks.image}
              {blocks.inputs}
            </>
          ) : (
            <>
              {blocks.image}
              {blocks.inputs}
              {blocks.info}
            </>
          )}
        </Flex>
        <Flex className="buttons">
          <Button
            variant="secondaryMedium"
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
