import { Styles } from "../../../utils/stylesInterface";

const styles: Styles = {
  dropzoneWrap: {
    width: ["100%", null],
    height: "280px",
    margin: "0 auto",
    flexDirection: "column",
    alignItems: "center",
    p: "3.75rem",
    border: "1.5px dashed #FFFFFF50",
    borderRadius: "1.25rem",
    maxWidth: "32.125rem",
  },
  tutorial: {
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "1.25rem",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: ["1.875rem", "1.25rem"],
    p: ["0 84px 26px 49px", "12px 46px 40px"],
    ">div:first-of-type": { width: "fit-content" },
    div: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      height: "110px",
      maxWidth: "192px",
      span: {
        mb: ".5rem",
      },
      a: {
        display: "flex",
        alignItems: "center",
        gap: ".5rem",
        fontSize: "14px",
        lineHeight: "120%",
        textDecorationLine: "underline",
        color: "rgba(255, 255, 255, 0.5)",
      },
      p: {
        fontSize: "14px",
        lineHeight: "120%",
        color: "rgba(255, 255, 255, 0.5)",
        m: "0",
        textAlign: "center",
      },
      ".subtitle-1": {
        color: "white",
      },
    },
    ".bg": {
      pointerEvents: "none",
      position: "absolute",
      bottom: 0,
      left: "auto",
      fontWeight: "bold",
      fontSize: "110px",
      lineHeight: "100%",
      color: "rgba(255, 255, 255, 0.1)",
    },
  },
  arrow: {
    width: ".75rem",
    height: ".75rem",
    border: "2px solid #FFFFFF",
    borderTop: "none",
    borderRight: "none",
    transform: "rotate(-45deg)",
    my: ["20px", "23px"],
    mx: "auto",
  },
  uploadOptions: {
    mb: ["2.5rem", "3.75rem"],
    gap: "1rem",
    flexWrap: [null, "wrap"],
    div: {
      maxWidth: "14,1875rem",
      width: "100%",
      p: "1.75rem",
      background: "#0F0F0F",
      borderRadius: "20px",
      transition: ".2s background",
      "&:hover": {
        cursor: "pointer",
        background: "#141D32",
      },
    },
  },
  buttons: {
    ".btn-cancel": {
      width: [null, "100%"],
      justifyContent: "center",
      py: [null, "1.25rem"],
      borderRadius: [null, "100px"],
    },
  },
};

export default styles;
