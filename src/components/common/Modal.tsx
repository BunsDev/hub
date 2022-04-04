/* eslint-disable @typescript-eslint/ban-ts-comment */
/** @jsxImportSource theme-ui **/
import React, { useCallback } from "react";
import { Flex, Button, Themed } from "theme-ui";
import { useStateValue, useRouter } from "hooks";
import Close from "../../../public/images/close.svg";
import { useModalContext } from "hooks/useModal";
import styles from "./styles";
import { useCeramic } from "hooks/useCeramic";
import { getCurrentNetworkId, networks } from "utils/networks";

export type ModalProps = {
  screen: string;
  onClose?: () => void;
};

const Modal = ({ screen = "connect", onClose = () => {} }: ModalProps) => {
  const [{ dapp }] = useStateValue();
  const { setVisible } = useModalContext();

  const { idx } = useCeramic();
  const router = useRouter();

  const handleConnect = async () => {
    const selected = await dapp.onboard?.walletSelect();
    if (selected) {
      await dapp.onboard?.walletCheck();
      setVisible(false);
      onClose();
    }
  };

  const handleDisconnect = async () => {
    dapp.onboard?.walletReset();
    setVisible(false);
    onClose();
  };

  const generateModalContent = (
    title: string,
    description: string | JSX.Element,
    button?: { title: string; onClick: () => any } | JSX.Element, // eslint-disable-line
    noClose = false
  ) => (
    <React.Fragment>
      {!noClose && (
        <Close
          className="modal-close-btn"
          onClick={() => {
            onClose();
            setVisible(false);
          }}
        />
      )}
      <Themed.h2 className="title">{title}</Themed.h2>
      {typeof description === "string" ? (
        <h4
          className="body-1"
          sx={{
            color: "polyGrey3",
            textAlign: "center",
          }}
        >
          {description}
        </h4>
      ) : (
        description
      )}
      {typeof button === "object" ? (
        <Button
          variant="primaryMedium"
          /* @ts-ignore- */
          onClick={button.onClick}
          sx={{ mt: "2.5rem" }}
        >
          {/* @ts-ignore- */}
          {button.title}
        </Button>
      ) : (
        button
      )}
    </React.Fragment>
  );

  const modalContent = (screen: string) => {
    switch (screen) {
      case "connect":
        const currentNetwrodId = getCurrentNetworkId();
        const currentNetworkSupported = Boolean(
          Object.keys(networks).includes(String(currentNetwrodId))
        );
        if (!currentNetworkSupported) {
          return generateModalContent(
            "Network change required",
            "This network isn't supported by Polywrap, please switch to supported network and try again."
          );
        }
        return generateModalContent(
          "Connect Wallet",
          "Please connect an ethereum wallet to continue.",
          { title: "Connect", onClick: handleConnect }
        );
      case "useFeature":
        return generateModalContent(
          "Connect Wallet",
          "To use this feature please connect an ethereum wallet and try again.",
          { title: "Connect", onClick: handleConnect }
        );
      case "disconnect":
        return generateModalContent(
          "Wallet Connected",
          <>
            <span className="body-1" sx={{ color: "#0F0F0F50" }}>
              Address
            </span>
            <span
              className="body-1"
              sx={{ display: "block", color: "polyGrey3" }}
            >
              {dapp.address}
            </span>
            {idx && (
              <>
                <span className="body-1" sx={{ color: "#0F0F0F50" }}>
                  DID
                </span>
                <span
                  className="body-1"
                  sx={{
                    display: "block",
                    color: "polyGrey3",
                    //@ts-ignore
                    wordWrap: "anywhere",
                    textAlign: "center",
                  }}
                >
                  {idx.ceramic.did.id}
                </span>
              </>
            )}
          </>,
          {
            title: "Disconnect",
            onClick: handleDisconnect,
          }
        );
      case "success":
        return generateModalContent(
          "Success!",
          "Package now live on the Polywrap!",
          {
            title: "View API",
            onClick: () => router.push(`/apis/ens/`),
          }
        );
      case "switch":
        return generateModalContent(
          "Switch To Desktop Version",
          "This feature is not available on a mobile, please switch to a desktop version",
          { title: "Ok", onClick: () => router.push(`/`) }
        );
      case "changeNetwork":
        return generateModalContent(
          "Network change required",
          "This network isn't supported by Polywrap, please switch to supported network or relogin",
          { title: "Disconnect", onClick: handleDisconnect },
          true
        );
    }
  };

  return (
    <Flex className="modal" sx={styles.modal}>
      {modalContent(screen)}
    </Flex>
  );
};

export default Modal;
