import { Styles } from "utils/stylesInterface";

const styles: Styles = {
  tabs: {
    "*": { cursor: "pointer", mr: 2, mb: 4 },
    ".tab": {
      textAlign: "center",
      fontSize: "1rem",
      letterSpacing: "-0.025rem",
      pb: " 1.125rem",
      color: "text",
      mb: 0,
      minWidth: "7.5rem",
      "&.active": {
        fontWeight: "bold",
        color: "w3darkGreen",
        borderBottom: "0.125rem solid",
        borderBottomColor: "w3NavNeonHighlightTeal",
        "&:hover": {
          borderBottom: "0.125rem solid",
          borderBottomColor: "w3NavNeonHighlightTeal",
        },
      },
      "&:hover": {
        borderBottom: "0.125rem solid",
        borderBottomColor: "background",
      },
    },
    ".label": {
      fontFamily: "Montserrat",
      fontSize: "1rem",
      lineHeight: "1.25rem",
      letterSpacing: "-0.025rem",
      color: "w3darkGreen",
      mixBlendMode: "normal",
      opacity: "0.9",
      mb: 0,
    },
    ".count": {
      backgroundColor: "rgba(104,129,132,.1)",
      fontFamily: "Montserrat",
      fontWeight: "600",
      fontSize: "0.8125rem",
      lineHeight: "1rem",
      textAlign: "center",
      letterSpacing: "-0.025rem",
      color: "w3darkGreen",
      mixBlendMode: "normal",
      px: "0.3rem",
      py: "0.1rem",
      borderRadius: "50%",
      mb: 0,
    },
  },
};

export default styles;
