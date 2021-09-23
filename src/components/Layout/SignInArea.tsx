/** @jsxImportSource theme-ui **/
import User from "../../../public/images/user.svg";
import Github from "../../../public/images/github-icon-large.svg";
import styles from "./styles";

import { useState } from "react";
import { Flex, Button, useThemeUI } from "theme-ui";
import { Modal } from "components";
import { useAuth, useStateValue, useRouter } from "hooks";

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
        ...styles.signInArea,
        ul: { color: onDark ? "white !important" : "" },
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
        {!dapp.address ? (
          <li
            onClick={handleSignIn}
            onKeyUp={handleSignIn}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <Button variant="primaryMedium" sx={{ display: "inline-block" }}>
              Log In
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
                fill={onDark ? "white" : theme.colors.polyDarkGreen}
                width="40px"
              />
              <span>&nbsp;</span>
              <span
                sx={{
                  color: onDark ? "white" : "polyDarkGreen",
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
