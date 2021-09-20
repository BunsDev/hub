import { Styles } from "utils/stylesInterface";

const styles: Styles = {
  wrap: {
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
};

export default styles;
