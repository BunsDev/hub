import { Styles } from "utils/stylesInterface";

const styles: Styles = {
  overlay: {
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
};

export default styles