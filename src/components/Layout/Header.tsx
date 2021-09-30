/** @jsxImportSource theme-ui **/
import { useEffect, useState } from "react";
import { Flex, Button } from "theme-ui";
import dynamic from "next/dynamic";
import Link from "next/link";
import onboardInit from "utils/onboardInit";
import { Navbar } from "components/Layout/Navigation";
const SignInArea = dynamic(() => import("./SignInArea"), { ssr: false });
import { useStateValue, useRouter, useResponsive } from "hooks";
import { API } from "bnc-onboard/dist/src/interfaces";

import styles from "./styles";
import { RESPONSOVE_BREAKPOINTS } from "../../constants";

const Header = () => {
  const [{ dapp }, dispatch] = useStateValue();
  const {
    windowSize,
    mobileNav: { setMobileNavActive },
  } = useResponsive();
  const router = useRouter();
  const [onboard, setOnboard] = useState<API>();

  useEffect(() => {
    const onboard = onboardInit(dispatch);
    setOnboard(onboard);
  }, []);

  useEffect(() => {
    const previouslySelectedWallet = localStorage.getItem("selectedWallet");

    if (previouslySelectedWallet && onboard) {
      onboard?.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);

  return (
    <header role="header" sx={styles.header}>
      <Flex className="nav-wrap">
        <Link href="/">
          <a className="logo-wrap">
            <img src="/images/logo.svg" alt="logo" />
          </a>
        </Link>
        {windowSize.width > RESPONSOVE_BREAKPOINTS.MEDIUM && <Navbar />}
      </Flex>
      {windowSize.width <= RESPONSOVE_BREAKPOINTS.MEDIUM ? (
        <img
          src="/images/burger.svg"
          alt="nav-menu-button"
          onClick={(e) => {
            e.preventDefault();
            setMobileNavActive(true);
          }}
        />
      ) : (
        <Flex className="user-authorized">
          {dapp.address && router.pathname !== "/apis/create" && (
            <Button
              variant="primaryMedium"
              onClick={() => {
                void router.push("/apis/create?activeTab=create");
              }}
            >
              Publish Wrapper
            </Button>
          )}
          <SignInArea onDark />
        </Flex>
      )}
    </header>
  );
};

export default Header;
