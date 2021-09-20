/** @jsxImportSource theme-ui **/
import { useEffect, useState } from "react";
import { Flex, Button } from "theme-ui";
import dynamic from "next/dynamic";
import Link from "next/link";

import onboardInit from "utils/onboardInit";
import { Navbar } from "components/Navigation";
const SignInArea = dynamic(() => import("../SignInArea/SignInArea"), { ssr: false });
import { useStateValue, useRouter, useResponsiveContext } from "hooks";
import { API } from "bnc-onboard/dist/src/interfaces";
import { RESPONSOVE_BREAKPOINTS } from "../../constants";

import styles from "./styles";

const Header = () => {
  const [{ dapp }, dispatch] = useStateValue();
  const {
    windowSize,
    mobileNav: { setMobileNavActive },
  } = useResponsiveContext();
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
      <Flex sx={{ alignItems: "center" }}>
        <Link href="/">
          <a
            sx={{
              display: "flex",
              height: "100%",
              mr: "3.125rem",
            }}
          >
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
        <Flex
          sx={{
            display: ["flex", "none"],
            justifyItems: "flex-end",
            gap: "1.5rem",
          }}
        >
          {dapp.address && router.pathname !== "/apis/create" && (
            <Button
              variant="primaryMedium"
              onClick={() => {
                router.push("/apis/create?activeTab=create");
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
