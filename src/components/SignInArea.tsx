/** @jsxImportSource theme-ui **/

import { useStateValue } from "../state/state";
import Modal from "./Modal";
import User from "../../public/images/user.svg";
import Github from "../../public/images/github-icon-large.svg";
import { useAuth } from "../hooks/useAuth";

import { useRouter } from "next/router";
import { Flex, Button, useThemeUI } from "theme-ui";
import { useState } from "react";

type SignInAreaProps = {
  onDark?: boolean;
};

const SignInArea = ({ onDark }: SignInAreaProps) => {
  const [{ dapp }] = useStateValue();
  const { theme } = useThemeUI();
  const router = useRouter();
  const { isAuthenticated } = useAuth(dapp);
  const [showGithubSignInModal, setShowGithubSignInModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const handleDisconnect = () => {
    setShowDisconnectModal(true);
  };
  const handleSignIn = () => {
    setShowSignInModal(true);
  };

  // @TODO: Handle in another page the removal of
  // web2 access tokens from IDX

  // const handleSignOut = () => {
  //   setShowSignOutModal(true)
  // }

  return (
    <Flex
      className="sign-in-wrap"
      sx={{
        ul: {
          display: "flex",
          color: onDark ? "white !important" : "",
          gap: "1.5rem",
        },
      }}
    >
      {showGithubSignInModal && (
        <div sx={{ position: "fixed", top: 0, left: 0, zIndex: 100000 }}>
          <Modal
            screen={"signin"}
            noLeftShift
            close={() => {
              setShowGithubSignInModal(false);
            }}
          />
        </div>
      )}
      {showDisconnectModal && (
        <div sx={{ position: "fixed", top: 0, left: 0, zIndex: 100000 }}>
          <Modal
            screen={"disconnect"}
            noLeftShift
            close={() => {
              setShowDisconnectModal(false);
            }}
          />
        </div>
      )}
      {showSignInModal && (
        <div sx={{ position: "fixed", top: 0, left: 0, zIndex: 100000 }}>
          <Modal
            screen={"connect"}
            noLeftShift
            close={() => {
              setShowSignInModal(false);
            }}
          />
        </div>
      )}
      {showSignOutModal && (
        <div sx={{ position: "fixed", top: 0, left: 0, zIndex: 100000 }}>
          <Modal
            screen={"signout"}
            noLeftShift
            close={() => {
              setShowSignOutModal(false);
            }}
          />
        </div>
      )}
      <ul sx={{ display: "flex", alignItems: "center" }}>
        <li>
          <Button
            variant="primaryMedium"
            onClick={() => {
              router.pathname !== "/apis/create"
                ? void router.push("/apis/create?activeTab=create")
                : void router.push("/");
            }}
          >
            {router.pathname !== "/apis/create"
              ? "Create New Wrapper"
              : "Cancel"}
          </Button>
        </li>
        {!dapp.address ? (
          <li
            onClick={handleSignIn}
            onKeyUp={handleSignIn}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <Button variant="primaryMedium" sx={{ display: "inline-block" }}>
              ?
            </Button>
            {/* <User /> */}
          </li>
        ) : (
          !dapp?.github &&
          isAuthenticated && (
            <li
              onClick={() => setShowGithubSignInModal(true)}
              onKeyUp={() => setShowGithubSignInModal(true)}
              sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              <Github
                fill={onDark ? "white" : theme.colors.w3darkGreen}
                width="40px"
              />
              <span>&nbsp;</span>
              <span
                sx={{
                  color: onDark ? "white" : "w3darkGreen",
                  fontFamily: "Montserrat",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  lineHeight: "1.0625rem",
                  letterSpacing: "-0.025rem",
                }}
              >
                Link GitHub Account
              </span>
            </li>
          )
        )}
        {dapp.address && (
          <li
            onClick={handleDisconnect}
            className="wallet-addr"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <User sx={{ cursor: "pointer" }} />
          </li>
        )}
      </ul>
    </Flex>
  );
};

export default SignInArea;
