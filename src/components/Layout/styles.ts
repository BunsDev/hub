import { Styles } from "utils/stylesInterface";

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
};

export default styles;
