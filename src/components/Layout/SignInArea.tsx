/** @jsxImportSource theme-ui **/
import User from "../../../public/images/user.svg";
import styles from "./styles";
import { keyframes } from "@emotion/react";
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

  const { openModal } = useModal(dapp.address ? "disconnect" : "connect");

  const handleDisconnect = () => {
    openModal();
  };
  const handleSignIn = () => {
    openModal();
  };

  const isLoggedIn = getItem("selectedWallet");

  return (
    <Flex
      className="sign-in-wrap"
      sx={{
        ...styles.signInArea,
        ul: { color: onDark ? "white !important" : "" },
        ".skeleton": {
          width: "38px",
          height: "38px",
          borderRadius: "50%",
          background:
            "linear-gradient(198deg, rgba(224,224,224,1) 27%, rgba(144,144,144,1) 63%)",
          backgroundSize: "200% 200%",
          animation: `${keyframes({
            from: { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            to: { backgroundPosition: "0% 50%" },
          })} 3s ease infinite`,
        },
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
