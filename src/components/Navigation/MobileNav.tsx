/** @jsxImportSource theme-ui **/

import { Button, Flex, Link } from "@theme-ui/components";
import { Themed } from "@theme-ui/mdx";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useStateValue } from "../../state/state";
import addrShortener from "../../utils/addrShortener";
import { navItems, conditionalNavItems } from "./navigationItems";
import NavItem from "./NavItem";
import useRouter from "../../hooks/useRouter";
import User from "../../../public/images/user.svg";
import Modal from "../Modal";
import styles from "./styles";

export default function MobileNav() {
  const [
    {
      dapp,
      mobile: { isMobileNavActive },
    },
    dispatch,
  ] = useStateValue();
  const router = useRouter();

  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleDisconnect = useCallback(() => {
    setShowDisconnectModal(true);
    dispatch({ type: "setismobilenavactive", payload: false });
  }, []);

  const handleSignIn = useCallback(() => {
    setShowSignInModal(true);
    dispatch({ type: "setismobilenavactive", payload: false });
  }, []);

  useEffect(() => {
    if (isMobileNavActive) document.body.style.overflow = "hidden";
    if (!isMobileNavActive) document.body.style.overflow = "unset";
  }, [isMobileNavActive]);

  const handleCloseNavMenu: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: "setismobilenavactive",
        payload: false,
      });
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
              <NavItem item={navItem} />
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
