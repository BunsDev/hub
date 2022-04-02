/** @jsxImportSource theme-ui **/
import User from "../../../public/images/user.svg";
import styles from "./styles";
import { Flex, Button } from "theme-ui";
import { useStateValue } from "hooks";
import useModal from "hooks/useModal";
import { useStorage } from "hooks/useLocalStorage";

type SignInAreaProps = {
  onDark?: boolean;
};

const SignInArea = ({ onDark }: SignInAreaProps) => {
  const [{ dapp }] = useStateValue();

  const { getItem } = useStorage();

  const isLoggedIn = getItem("selectedWallet");
  const { openModal } = useModal(!!isLoggedIn && dapp.address ? "disconnect" : "connect");

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
        {isLoggedIn ? (
          dapp.address ? (
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
            <div className="skeleton" />
          )
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
