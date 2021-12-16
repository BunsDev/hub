/** @jsxImportSource theme-ui **/
import User from "../../../public/images/user.svg";
import styles from "./styles";

import { Flex, Button } from "theme-ui";
import { useStateValue } from "hooks";
import useModal from "hooks/useModal";

type SignInAreaProps = {
  onDark?: boolean;
};

const SignInArea = ({ onDark }: SignInAreaProps) => {
  const [{ dapp }, dispatch] = useStateValue();

  const { openModal } = useModal(dapp.address ? "disconnect" : "connect");

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
        {dapp.address ? (
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
