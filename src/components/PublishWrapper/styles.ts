import { Styles } from "utils/stylesInterface";

const styles: Styles = {
  steps: {
    width: [null, "100%"],
    justifyContent: [null, "space-between"],
    span: {
      fontWeight: ["800", "600"],
      fontSize: ["20px", "16px"],
      color: "rgba(255, 255, 255, 0.5)",
      transition: ".2s all",
      "&:after": {
        content: "'-'",
        m: ["0 12px", "0 22px"],
        color: "rgba(255, 255, 255, 0.5)",
      },
      "&:last-child": {
        "&:after": {
          display: "none",
        },
      },
    },
    "span.active": { color: "white" },
  },
  errorMsg: {
    fontSize: "14px",
    lineHeight: "22px",
    letterSpacing: "-0.4000000059604645px",
    textAlign: "left",
    color: "rgba(255, 0, 0, 0.5)",
    mt: 2,
  },
  navButtons: {
    justifyContent: "space-between",
    mt: "2.5rem",
    flexWrap: "wrap",
    button: {
      textAlign: "center",
      width: [null, "100%"],
      py: [null, "20px"],
      borderRadius: [null, "100px"],
    },
    flexDirection: [null, "column-reverse"],
  },
  publish: {
    gap: ["3.75rem", "20px"],
    justifyContent: "space-between",
    flexDirection: [null, "column"],
    ".buttons": {
      justifyContent: "space-between",
      mt: "2.5rem",
      flexDirection: [null, "column-reverse"],
      gap: [null, "1.25rem"],
      button: {
        width: [null, "100%"],
        p: [null, "20px 0"],
        borderRadius: [null, "100px"],
      },
    },
    ".image-wrap": {
      height: ["10.125rem", "auto"],
      width: ["10.125rem", "100%"],
      minHeight: "10.125rem",
      minWidth: "10.125rem",
      background: "white",
      borderRadius: "1.25rem",
      overflow: "hidden",
      img: {
        width: "100%",
        height: "auto",
      },
    },
    ".inputs": {
      minWidth: ["30.5rem", "auto"],
      flexGrow: 1,
      ">div": { mb: "26px" },
      ".succes-icon-wrap": { width: "65px", justifyContent: "center" },
      ".btn-add-ens:first-child": {
        m: [null, "0 auto"],
        p: [null, "20px 30.5px"],
        borderRadius: [null, "100px"],
      },
      ".btn-save-ens": {
        bg: "rgba(255, 255, 255, .1)",
        width: "65px",
        alignSelf: "stretch",
        borderRadius: "6px",
        border: "none",
        margin: "2px",
        justifyContent: "center",
        fontSize: "14px",
        lineHeight: "120%",
        fontWeight: "normal",
      },
    },
    ".info": { maxWidth: ["30%", "100%"] },
  },
  wrapper: {
    flexDirection: "column",
    mt: ["3.125rem", "0"],
    height: "100%",
    ".fieldset": {
      margin: [null, "auto 0"],
    },
    ".inputwrap": {
      maxWidth: "100%",
      width: ["30.6875rem", null],
    },
  },
  suffixButton: {
    width: "65px",
    boxSizing: "content-box",
    alignSelf: "stretch",
    borderRadius: "6px",
    border: "none",
    margin: "2px",
    justifyContent: "center",
    fontSize: "14px",
    lineHeight: "120%",
    fontWeight: "normal",
  },
  successIcon: { width: "65px", justifyContent: "center" },
  loadingIcon: { width: "65px", height: "100%", justifyContent: "center" },
};
export default styles;
