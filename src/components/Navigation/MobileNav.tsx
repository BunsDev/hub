/** @jsxImportSource theme-ui **/

import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { useStateValue } from "../../state/state";

export default function MobileNav() {
  const [
    {
      mobile: { isMobileNavActive },
    },
    dispatch,
  ] = useStateValue();

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

  return (
    <div
      className="nav-mobile-bg"
      sx={{
        zIndex: isMobileNavActive ? '1' : '-1',
        position: "fixed",
        top: "0",
        height: "100vh",
        width: "100vw",
        transition: ".3s all",
        bg: isMobileNavActive ? "rgba(255, 255, 255, 0.5)" : "transparent",
      }}
    >
      <div onClick={handleCloseNavMenu}>X</div>
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
        }}
      >
        <a>Hello</a>
        <a>World</a>
      </nav>
    </div>
  );
}
