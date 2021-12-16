import { Styles } from "utils/stylesInterface";

const styles: Styles = {
  wrapper: {
    alignItems: "center",
    p: "0.625rem 0.75rem",
    background: "rgba(0, 0, 0, 0.24)",
    borderRadius: "1.25rem",
    width: ["17.5rem", "100%"],
  },
  input: {
    border: "none",
    p: 0,
    height: "1rem",
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "100%",
    fontFamily: "Nunito sans",
    background: "transparent",
  },
  searchIcon: {
    cursor: "pointer",
    userSelect: "none",
    mr: ".5rem",
  },
};

export default styles;
