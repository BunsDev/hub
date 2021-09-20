import { Styles } from "utils/stylesInterface";

const styles: Styles = {
  layout: {
    zIndex: "1",
    "&::before, &::after": {
      display: "none",
    },
    minHeight: "100vh",
    background: "#1E1D22",
  },
};

export default styles;
