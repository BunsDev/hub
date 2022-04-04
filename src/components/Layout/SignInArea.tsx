/** @jsxImportSource theme-ui **/
import User from "../../../public/images/user.svg";
import styles from "./styles";
import { Flex, Button } from "theme-ui";
import { useStateValue } from "hooks";
import useModal from "hooks/useModal";
import { useStorage } from "hooks/useLocalStorage";
import { useEffect, useState } from "react";

type SignInAreaProps = {
  onDark?: boolean;
};

const SignInArea = ({ onDark }: SignInAreaProps) => {
  const [{ dapp }] = useStateValue();

  const { getItem } = useStorage();
  const [loading, setLoading] = useState(!!getItem("selectedWallet"));

  const isLoggedIn = Boolean(getItem("selectedWallet")) && dapp.address;

  const { openModal } = useModal(
    !loading && isLoggedIn ? "disconnect" : "connect"
  );

  useEffect(() => {
    // Timeout to make sure loading state will end
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    if (dapp.address) {
      setLoading(false);
    }
  }, [dapp.address]);

  const handleDisconnect = () => {
    openModal();
  };
  const handleSignIn = () => {
    openModal();
  };

  return (
    <Flex
      className="sign-in-wrap"
      sx={{
        ...styles.signInArea,
        ul: { color: onDark ? "white !important" : "" },
      }}
    >
      <ul sx={{ display: "flex", alignItems: "center" }}>
        {loading ? (
          <div className="skeleton" />
        ) : isLoggedIn ? (
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
        ) : (
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
        )}
      </ul>
    </Flex>
  );
};

export default SignInArea;
