import { Styles } from "utils/stylesInterface";
import { keyframes } from "@emotion/react";

const styles: Styles = {
  layout: {
    zIndex: "1",
    "&::before, &::after": {
      display: "none",
    },
    minHeight: "100vh",
    background: "#1E1D22",
    ">main": {
      ">section.content": {
        width: "100%",
      },
    },
    ".spinner_wrap": {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    pl: ["2.365rem", 3],
    pr: ["2.5rem", 3],
    pt: [null, "2.5rem"],
    pb: [null, "1.25rem"],
    mb: ["3.25rem", "0"],
    boxSizing: "content-box",
    height: ["4.5625rem", "fit-content"],
    background: "transparent",
    img: {
      height: [null, "1.5rem"],
    },
    ".nav-wrap": {
      alignItems: "center",
      ".logo-wrap": {
        display: "flex",
        height: "100%",
        mr: "3.125rem",
      },
    },
    ".user-authorized": {
      display: ["flex", "none"],
      justifyItems: "flex-end",
      gap: "1.5rem",
    },
  },
  signInArea: {
    ul: {
      display: "flex",
      gap: "1.5rem",
    },
  },
  ".skeleton": {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background:
      "linear-gradient(198deg, rgba(224,224,224,1) 27%, rgba(144,144,144,1) 63%)",
    backgroundSize: "200% 200%",
    animation: `${keyframes({
      from: { backgroundPosition: "0% 50%" },
      "50%": { backgroundPosition: "100% 50%" },
      to: { backgroundPosition: "0% 50%" },
    })} 3s ease infinite`,
  },
};

export default styles;
