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
};
export default styles;
