import { Styles } from "utils/stylesInterface";

const styles: Styles = {
  searchBox: {
    borderRadius: "0.5rem !important",
    height: "2.5rem",
    width: "21.25rem !important",
    maxWidth: "100%",
    bg: "black",
    border: "none !important",
    boxShadow: "none !important",
    ".react-dropdown-select-input": {
      fontFamily: "Nunito Sans",
      fontSize: "16px",
      lineHeight: "150%",
    },
    ".react-dropdown-select-no-data": {
      color: "text",
    },
    ".react-dropdown-select-clear": {
      fontSize: "1.5625rem !important",
      top: "-0.125rem !important",
      right: "-0.375rem !important",
    },
    ".react-dropdown-select-dropdown": {
      top: "3rem",
      bg: "black",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "1.25rem",
      boxShadow: "12px 20px 54px -6px #141316",
    },
    ".react-dropdown-select-item": {
      display: "flex",
      border: "none !important",
      lineHeight: "100%",
      py: "0.375rem",
      "&::before": {
        display: "block !important",
        content: "''",
        width: "1rem !important",
        height: "1rem !important",
        mr: ".75rem !important",
      },
      "&:hover, &.react-dropdown-select-item-selected": {
        bg: "rgba(255, 255, 255, 0.2)",
      },
      "&.react-dropdown-select-item-selected": {
        bg: "rgba(255, 255, 255, 0.4)",
      },
    },
    ".react-dropdown-select-content": {
      "&::before": {
        display: "block !important",
        content: "''",
        width: "1.5rem !important",
        height: "1.5rem !important",
        mr: ".75rem !important",
        background: "url(/images/magnifying-glass.svg) no-repeat !important",
      },
      span: {
        fontSize: "16px",
        lineHeight: "150%",
      },
    },
  },
};

export default styles;
