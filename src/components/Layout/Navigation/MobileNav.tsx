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
import { useRouter, useStateValue, useResponsiveContext } from "hooks";
import User from "../../../../public/images/user.svg";

import styles from "./styles";

export default function MobileNav() {
  const [{ dapp }] = useStateValue();
  const {
    mobileNav: { isMobileNavActive, setMobileNavActive },
  } = useResponsiveContext();
  const router = useRouter();

  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

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
    let res = [...navItems];
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
            <Themed.h2 sx={{ mb: "0" }}>Menu</Themed.h2>
            <img
              src="/images/close.svg"
              alt="close-button"
              onClick={handleCloseNavMenu}
            />
          </Flex>
          <Flex className="user">
            {dapp.address ? (
              <>
                <User sx={{ cursor: "pointer", mb: "1.25rem" }} />
                {dapp.address && <span>{addrShortener(dapp.address)}</span>}
              </>
            ) : (
              <div
                onClick={handleSignIn}
                onKeyUp={handleSignIn}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="primaryMedium"
                  sx={{ display: "inline-block" }}
                >
                  Log In
                </Button>
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
                  router.push("/apis/create?activeTab=create");
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
    </>
  );
}
