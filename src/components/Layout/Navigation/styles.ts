import { Styles } from "../../../utils/stylesInterface";

const styles: Styles = {
  mobileNav: {
    position: "fixed",
    top: "0",
    height: "100vh",
    width: "100vw",
    transition: ".3s all",
    nav: {
      position: "absolute",
      top: "0",
      height: "100%",
      width: "80%",
      bg: "black",
      transition: ".3s all",
      display: "flex",
      flexDirection: "column",
      overflowY: "scroll",
      ".head": {
        justifyContent: "space-between",
        alignItems: "center",
        p: "2.25rem 1rem 2.25rem 2rem",
        h2: { mb: "0" },
      },
      ".user": {
        flexDirection: "column",
        alignItems: "center",
        py: "1.5rem",
        mb: "1.5rem",
        ".wallet-addr": { svg: { width: "140px", height: "auto" } },
        ".user-icon": { cursor: "pointer", mb: "1.25rem" },
        ".btn-wrap": {
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        },
      },
      ".navList": {
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
      },
      ".btnWrap": {
        py: "3.4375rem",
        px: "2rem",
        justifySelf: "flex-end",
        button: {
          width: "100%",
          justifyContent: "center",
        },
      },
    },
  },
  navBar: {
    display: ["flex", "none"],
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    ul: {
      display: "flex",
      flexDirection: "row",
      height: "4.5625rem",
    },
  },
};

export default styles;
