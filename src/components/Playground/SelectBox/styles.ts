import { Styles } from "utils/stylesInterface";

const styles: Styles = {
  selectBox: {
    border: "none !important",
    bg: "polyGrey3",
    borderRadius: ".5rem !important",
    color: "text",
    fontFamily: "Nunito Sans",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "150%",
    p: ".5rem 1rem !important",
    pr: "10px !important",
    mb: "1rem",
    '& [aria-expanded="true"]': {
      ".react-dropdown-select-dropdown-handle": {
        transform: "rotate(90deg)",
      },
    },
    ".react-dropdown-select-dropdown-handle": {
      transition: ".2s transform",
    },
    ".react-dropdown-select-no-data": {
      color: "text",
    },
    "&:hover, &:focus-within": {
      borderColor: "text",
      boxShadow: "none !important",
    },
    ".react-dropdown-select-clear": {
      fontSize: "1.5625rem !important",
      top: "-0.125rem !important",
      right: "-0.375rem !important",
    },
    ".react-dropdown-select-dropdown": {
      position: "absolute",
      top: "2.5rem",
      bg: "black",
      color: "white",
      p: "9px 0 20px",
      mt: ".5rem !important",
      borderRadius: "1.25rem",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "12px 20px 54px -6px #141316",
    },
    "span.react-dropdown-select-item": {
      border: "none !important",
      borderBottom: "none !important",
      fontFamily: "Nunito Sans !important",
      fontWeight: "600",
      fontSize: "16px",
      lineHeight: "100% !important",
      padding: "6px 24px !important",
      display: "flex !important",
      alignItems: "center !important",
      justifyContent: "left !important",
      "&:hover": {
        bg: "polyGrey3",
      },
      "span.react-dropdown-select-item.react-dropdown-select-item-selected": {
        bg: "polyGrey3 !important",
      },
    },
    ".react-dropdown-select-content": {
      span: {
        height: "1.5rem !important",
        display: "flex !important",
        flexDirection: "column",
        alignItems: "center !important",
        justifyContent: "center !important",
        fontFamily: "Nunito Sans !important",
        fontSize: "16px !important",
        lineHeight: "150% !important",
      },
    },
    ".react-dropdown-select-dropdown-handle:focus path": {
      stroke: "none !important",
    },
  },
};

export default styles;
