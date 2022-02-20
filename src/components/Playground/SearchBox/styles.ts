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
    p: "3px 16px !important",
    ".react-dropdown-select-input": {
      display:"none",
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
    ".react-dropdown-select-dropdown.react-dropdown-select-dropdown-position-bottom":
      {
        top: "3rem",
        bg: "black",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "1.25rem",
        boxShadow: "12px 20px 54px -6px #141316",
      },
    ".dropdown-content": {
      ".dropdown-search": {
        p: "1rem 1.5rem .5rem",
        borderBottom: "1px solid #FFFFFF20",
      },
      ".dropdown-options": {
        pt: "4px",
        pb: "22px",
        ".dropdown-item": {
          display: "flex",
          border: "none",
          lineHeight: "100%",
          py: "0.375rem",
          "&::before": {
            display: "block !important",
            content: "''",
            width: "1rem !important",
            height: "1rem !important",
            mr: ".75rem !important",
          },
          "&:hover": {
            bg: "rgba(255, 255, 255, 0.2)",
          },
          "&.selected": {
            bg: "rgba(255, 255, 255, 0.1)",
          },
          "&.empty": {
            cursor: "default",
            "&:hover": {
              bg: "inherit",
            },
          },
        },
      },
    },
    ".react-dropdown-select-content": {
      span: {
        fontSize: "16px",
        lineHeight: "150%",
      },
    },
  },
};

export default styles;
