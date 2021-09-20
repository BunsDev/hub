import { Styles } from "utils/stylesInterface";

const styles: Styles = {
  wrap: {
    ".margin-view-overlays": {
      ">div": {
        ">div": {
          width: "34px !important",
        },
      },
    },
    ".title": {
      m: 0,
      py: 2,
      px: ".75rem",
      bg: "#1e1e1e1",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderLeft: "none",
      borderRight: "none",
    },
  },
};

export default styles;
