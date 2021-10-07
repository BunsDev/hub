/* eslint-disable @typescript-eslint/ban-ts-comment */
/** @jsxImportSource theme-ui **/
import React, { useCallback } from "react";
import { Flex, Button, Themed } from "theme-ui";
import onboardInit from "utils/onboardInit";
import { useStateValue, useRouter } from "hooks";
import Close from "../../../public/images/close.svg";
import styles from "./styles";

type ModalProps = {
  screen: string;
  noLeftShift?: boolean;
  data?: string;
  close?: () => void;
};

const Modal = ({
  screen = "connect",
  close,
  noLeftShift,
  data,
}: ModalProps) => {
  const [{ dapp }, dispatch] = useStateValue();
  const router = useRouter();
  const onboard = onboardInit(dispatch);

  const CloseButton = <Close className="modal-close-btn" onClick={close} />;

  const handleConnect = async () => {
    const selected = await onboard.walletSelect();
    if (selected) {
      await onboard.walletCheck();
      close();
    }
  };

  const handleDisconnect = async () => {
    onboard.walletReset();
    close();
  };

  const handleSignOut = () => {
    dispatch({
      type: "SET_GITHUB_USER",
      payload: "",
    });
    close();
  };

  const generateModalContent = useCallback(
    (
      title: string,
      description: string | JSX.Element,
      button: { title: string; onClick: () => any } | JSX.Element // eslint-disable-line
    ) => (
      <React.Fragment>
        {close ? CloseButton : null}
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
    ),
    []
  );

  const modalContent = (screen: string) => {
    switch (screen) {
      case "connect":
        return generateModalContent(
          "Connect Wallet",
          "Please connect an ethereum wallet to continue.",
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
          </>,
          {
            title: "Disconnect",
            onClick: handleDisconnect,
          }
        );
      case "signin":
        return generateModalContent(
          "Sign in",
          " Please sign in with GitHub to continue.",
          <a
            href={`https://github.com/login/oauth/authorize?client_id=c0b5102af0262717b743&scope=read:user read:org`}
            onClick={() => {
              localStorage.setItem("w3hubLastURLb4Signin", router.asPath);
            }}
          >
            <Button variant="primaryMedium" sx={{ mt: "2.5rem" }}>
              Sign in with github
            </Button>
          </a>
        );
      case "signout":
        return generateModalContent(
          "Sign out",
          "Would you like to sign out of github?",
          { title: "Sign out", onClick: handleSignOut }
        );
      case "success":
        return generateModalContent(
          "Success!",
          "Package now live on the Polywrap!",
          {
            title: "View API",
            onClick: () => router.push(`/apis/ens/${data}`),
          }
        );
      case "switch":
        return generateModalContent(
          "Switch To Desktop Version",
          "This feature is not available on a mobile, please switch to a desktop version",
          { title: "Ok", onClick: close }
        );
    }
  };

  return (
    <Flex className="overlay" sx={styles.modalOverlay}>
      <Flex
        className="modal"
        sx={{
          left: noLeftShift ? "0rem" : "-7rem",
        }}
      >
        {modalContent(screen)}
      </Flex>
    </Flex>
  );
};

export default Modal;
