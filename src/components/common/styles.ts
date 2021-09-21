import { Styles } from "utils/stylesInterface";

const styles: Styles = {
  badge: {
    textTransform: "uppercase",
    textAlign: "center",
    borderRadius: "1.125rem",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    px: "10px",
    py: "2px",
    fontFamily: '"Poppins"',
    fontSize: "0.75rem",
    lineHeight: "1.125rem",
  },
  input: {
    wrap: {
      alignItems: "center",
      bg: "w3Grey3",
      borderRadius: ".5rem",
      height: "2.5rem",
    },
    input: {
      border: "none",
      pl: "1rem",
      height: "100%",
      fontFamily: "Nunito Sans",
      fontSize: "16px",
      lineHeight: "150%",
    },
  },
  star: {
    cursor: "pointer",
    alignItems: "center",
    ".star": {
      mr: "4px",
      width: "auto",
    },
    "&.large .star": {
      width: "1.125rem",
      height: "1.125rem",
      top: "-0.125rem",
      left: "-0.125rem",
    },
    ".star-count": {
      fontWeight: "400",
      color: "w3OffWhite",
      ml: 2,
      fontSize: "1.25rem",
      lineHeight: "1.5rem",
    },
    "&.large .star-count": {
      fontWeight: "400",
      letterSpacing: "0rem",
      color: "w3OffWhite",
      fontSize: "1.25rem",
      lineHeight: "1.5rem",
    },
  },
  modalOverlay: {
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: 10000,
    background: "rgba(0,0,0,.4)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    p: "1rem",
    ".title": {
      color: "black",
      mb: ".75rem",
      textAlign: "center",
    },
    ".modal-close-btn": {
      position: "absolute",
      right: "20px",
      top: "20px",
      fill: "w3Grey3",
      cursor: "pointer",
    },
    ".modal": {
      width: "100%",
      maxWidth: "36.125rem",
      maxHeight: "21.4375rem",
      top: "0rem",
      backgroundColor: "white",
      borderRadius: "1rem",
      p: "2.5rem",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10000000,
      button: {
        borderRadius: [null, "3.75rem"],
        p: [null, "1.25rem 2rem"],
      },
    },
  },
  loadingSpinner: {
    display: "inline-block",
    width: "160px",
    height: "160px",
    "&:after": {
      content: '" "',
      display: "block",
      width: "128px",
      height: "128px",
      margin: "8px",
      borderRadius: "50%",
      border: "12px solid #fff",
      borderColor: "#fff transparent #fff transparent",
      animation: "lds-dual-ring 1.2s linear infinite",
    },
    "@keyframes lds-dual-ring": {
      "0%": {
        transform: "rotate(0deg)",
      },
      "100%": {
        transform: "rotate(360deg)",
      },
    },
  },
  gqlcodeblock: {
    ".margin-view-overlays": {
      ">div": {
        ">div": {
          width: "34px !important",
        },
      },
    },
    ".title": {
      m: 0,
      py: 2,
      px: ".75rem",
      bg: "#1e1e1e1",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderLeft: "none",
      borderRight: "none",
    },
  },
};

export default styles;
