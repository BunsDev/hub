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
          zIndex: isMobileNavActive ? "1" : "-1",
          position: "fixed",
          top: "0",
          height: "100vh",
          width: "100vw",
          transition: ".3s all",
          bg: isMobileNavActive ? "rgba(255, 255, 255, 0.5)" : "transparent",
        }}
        onClick={handleCloseNavMenu}
      >
        <nav
          className={`nav-mobile ${isMobileNavActive ? "active" : ""}`}
          sx={{
            position: "absolute",
            top: "0",
            right: isMobileNavActive ? "0" : "-100%",
            height: "100%",
            width: "80%",
            bg: "black",
            transition: ".3s all",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Flex
            className="head"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              p: "2.25rem 1rem 2.25rem 2rem",
            }}
          >
            <Themed.h2 sx={{ mb: "0" }}>Menu</Themed.h2>
            <img
              src="/images/close.svg"
              alt="close-button"
              onClick={handleCloseNavMenu}
            />
          </Flex>
          <Flex
            className="user"
            sx={{
              flexDirection: "column",
              alignItems: "center",
              py: "1.5rem",
              mb: "1.5rem",
              ".wallet-addr": { svg: { width: "140px", height: "auto" } },
            }}
          >
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
          <Flex
            className="navList"
            sx={{
              flexDirection: "column",
              "li.navItem": {
                maxWidth: "237px",
                "&.expandable::before": {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                },
                ".dropdown-content::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                },
                "&::before, .dropdown-content::before": {
                  top: "auto",
                  left: "0",
                  width: ".5rem",
                  height: "100%",
                },
                a: {
                  p: "1rem 2rem",
                },
                ".dropdown-content a": {
                  p: "1rem",
                  paddingBottom: "6px",
                  marginBottom: "0",
                },
              },
            }}
          >
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
            <Flex
              sx={{
                py: "3.4375rem",
                px: "2rem",
                justifySelf: "flex-end",
              }}
            >
              <Button
                sx={{
                  width: "100%",
                  justifyContent: "center",
                }}
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
