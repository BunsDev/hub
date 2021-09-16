/** @jsxImportSource theme-ui **/

import onboardInit from "../utils/onboardInit";
import { useStateValue } from "../state/state";
import Navbar from "./Navigation/Navbar";
const SignInArea = dynamic(() => import("./SignInArea"), { ssr: false });

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flex, Button } from "theme-ui";
import dynamic from "next/dynamic";
import { API } from "bnc-onboard/dist/src/interfaces";
import useRouter from "../hooks/useRouter";

const Header = () => {
  const [
    {
      dapp,
      mobile: { isMobile },
    },
    dispatch,
  ] = useStateValue();
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
    <header
      role="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        pl: ["2.365rem", 3],
        pr: ["2.5rem", 3],
        py: [null, "44px"],
        mb: "40px",
        maxHeight: "4.5625rem",
        background: "transparent",
      }}
    >
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
        <Navbar />
      </Flex>
      {isMobile ? (
        <img
          src="/images/burger.svg"
          alt="nav-menu-button"
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "setismobilenavactive", payload: true });
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
