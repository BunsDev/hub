/** @jsxImportSource theme-ui **/

import onboardInit from "../utils/onboardInit";
import { useStateValue } from "../state/state";
import Navbar from "./Navbar";
const SignInArea = dynamic(() => import("./SignInArea"), { ssr: false });

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flex } from "theme-ui";
import dynamic from "next/dynamic";
import { API } from "bnc-onboard/dist/src/interfaces";

const Header = () => {
  const [_, dispatch] = useStateValue();
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
        pl: "2.365rem",
        pr: "2.5rem",
        maxHeight: "4.5625rem",
        background: "transparent",
        "> *": { display: "flex" },
        ".col": { flex: 2, "&:last-of-type": { justifyContent: "flex-end" } },
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
      <Flex sx={{ justifyItems: "flex-end", gap: "1.5rem" }}>
        <SignInArea onDark />
      </Flex>
    </header>
  );
};

export default Header;
