/** @jsxImportSource theme-ui **/
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button, Flex } from "@theme-ui/components";
import { Themed } from "@theme-ui/mdx";

import { NavItem } from "components/Layout/Navigation";
import { Modal } from "components";
import { navItems, conditionalNavItems } from "./navItemsData";
import addrShortener from "utils/addrShortener";
import { useRouter, useStateValue, useResponsive } from "hooks";
import User from "../../../../public/images/user-large.svg";
import Close from "../../../../public/images/close-white.svg";

import styles from "./styles";

export default function MobileNav() {
  const [{ dapp }] = useStateValue();
  const {
    mobileNav: { isMobileNavActive, setMobileNavActive },
  } = useResponsive();
  const router = useRouter();

  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSwitchToDesktopModal, setShowSwitchToDesktopModal] =
    useState(false);

  const handleDisconnect = useCallback(() => {
    setShowDisconnectModal(true);
    setMobileNavActive(false);
  }, []);

  const handleSignIn = useCallback(() => {
    setShowSignInModal(true);
    setMobileNavActive(false);
  }, []);

  useEffect(() => {
    if (isMobileNavActive) document.body.style.overflow = "hidden";
    if (!isMobileNavActive) document.body.style.overflow = "unset";
  }, [isMobileNavActive]);

  const handleCloseNavMenu: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      setMobileNavActive(false);
    },
    [isMobileNavActive]
  );

  const navList = useMemo(() => {
    const res = [...navItems];
    if (dapp.address) {
      res.splice(2, 0, conditionalNavItems.favorites);
    }
    return res;
  }, [dapp.address]);

  return (
    <>
      <div
        className="nav-mobile-bg"
        sx={{
          ...styles.mobileNav,
          zIndex: isMobileNavActive ? "1" : "-1",
          bg: isMobileNavActive ? "rgba(255, 255, 255, 0.5)" : "transparent",
        }}
        onClick={handleCloseNavMenu}
      >
        <nav
          className={`nav-mobile ${isMobileNavActive ? "active" : ""}`}
          sx={{ right: isMobileNavActive ? "0" : "-100%" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Flex className="head">
            <Themed.h2>Menu</Themed.h2>
            <Close onClick={handleCloseNavMenu} />
          </Flex>
          <Flex className="user">
            {dapp.address ? (
              <>
                <User className="user-icon" />
                {dapp.address && <span>{addrShortener(dapp.address)}</span>}
              </>
            ) : (
              <div
                onClick={handleSignIn}
                onKeyUp={handleSignIn}
                className="btn-wrap"
              >
                <Button variant="primaryMedium">Log In</Button>
              </div>
            )}
          </Flex>
          <Flex className="navList">
            {navList.map((navItem) => (
              <NavItem key={navItem.title} item={navItem} />
            ))}
            {dapp.address && (
              <NavItem
                item={conditionalNavItems.logout}
                onClick={handleDisconnect}
              />
            )}
          </Flex>
          {dapp.address && router.pathname !== "/apis/create" && (
            <Flex className="btnWrap">
              <Button
                variant="primaryMedium"
                onClick={() => {
                  setShowSwitchToDesktopModal(true);
                }}
              >
                Publish Wrapper
              </Button>
            </Flex>
          )}
        </nav>
      </div>
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
      {showSwitchToDesktopModal && (
        <div sx={{ position: "fixed", top: 0, left: 0, zIndex: 100000 }}>
          <Modal
            screen={"switch"}
            noLeftShift
            close={() => {
              setShowSwitchToDesktopModal(false);
            }}
          />
        </div>
      )}
    </>
  );
}
