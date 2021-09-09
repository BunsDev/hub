/** @jsxImportSource theme-ui **/
import { FormEventHandler, useEffect } from 'react'
import { Input, Flex, Button, Themed } from 'theme-ui'
import { useCreateSubdomain } from '../../hooks/ens/useCreateSubdomain'
import { useStateValue } from '../../state/state'
import { ipfsGateway, domain, MAIN_DOMAIN } from '../../constants'

import { useRouter } from "next/router";
import { Input, Flex, Button, Themed } from "theme-ui";
import { FormEventHandler, useEffect } from "react";

const PublishAPI = () => {
  const [{ dapp, publish }, dispatch] = useStateValue();
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

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} onInvalid={handleInvalid}>
        <Flex
          className="publish"
          sx={{ gap: "3.75rem", justifyContent: "space-between" }}
        >
          <div
            className="image_wrap"
            sx={{
              height: "10.125rem",
              width: "10.125rem",
              minHeight: "10.125rem",
              minWidth: "10.125rem",
              background: "white",
              borderRadius: "1.25rem",
              overflow: "hidden",
            }}
          >
            {publish.apiData && (
              <img
                sx={{
                  width: "100%",
                  height: "auto",
                }}
                src={`${ipfsGateway}${
                  publish.ipfs || stripIPFSPrefix(publish.apiData.locationUri)
                }${publish.apiData.icon.replace("./", "/")}`}
              />
            )}
          </div>
          <div className="inputs" sx={{ width: "100%", minWidth: "30.5rem" }}>
            <label>IPFS</label>
            <Input value={publish?.ipfs} disabled />
            <label>ENS Name</label>
            <Input value={publish?.subdomain} disabled />
          </div>
          <div className="info" sx={{ maxWidth: "30%" }}>
            {publish?.apiData?.name && (
              <Themed.h2>{publish?.apiData?.name}</Themed.h2>
            )}
            {publish?.apiData?.description && (
              <p className="body-1">{publish?.apiData?.description}</p>
            )}
          </div>
        </Flex>
        <Flex
          className="buttons"
          sx={{ justifyContent: "space-between", mt: "2.5rem" }}
        >
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
