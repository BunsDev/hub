import { Styles } from "../../../utils/stylesInterface";

const styles: Styles = {
  mobileNav: {
    position: "fixed",
    top: "0",
    height: "100vh",
    width: "100vw",
    transition: ".3s all",
    "nav.nav-mobile": {
      position: "absolute",
      top: "0",
      height: "100%",
      width: "80%",
      maxWidth: "435px",
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
          maxWidth: ["341px", "237px"],
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
  navItem: {
    transition: "background-color 0.5s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      width: "100%",
      height: "0.5rem",
      borderRadius: "4px",
      transition: "background-color 0.5s ease",
    },
    ">a": {
      p: "21.25px",
      pt: "34.25px",
      textDecoration: "none",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      height: "100%",
      width: "100%",
      img: { width: "1.25rem", height: "1.25rem" },
      "span.text-nav": { ml: "8px" },
    },
    span: {
      color: "white",
      fontSize: "1rem",
    },
  },
  expandableNavItem: {
    minWidth: "10rem",
    zIndex: 10,
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
    "&:hover": {
      ".dropdown-content": {
        display: "flex",
      },
    },
    ".dropdown-content": {
      display: "none",
      flexDirection: "column",
      position: "absolute",
      top: "100%",
      bg: "inherit",
      width: "100%",
      p: "0 40px 14px 48px",
      borderBottomLeftRadius: ".25rem",
      borderBottomRightRadius: ".25rem",
      "&:hover": {
        display: "flex",
      },
      ">a": {
        mb: "1rem",
      },
    },
  },
};

export default styles;
