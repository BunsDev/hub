import { ThemeUIStyleObject } from "@theme-ui/css";
import { Styles } from "utils/stylesInterface";

const circleBase: ThemeUIStyleObject = {
  display: "block",
  position: "absolute",
  width: "1000px",
  height: "1000px",
  opacity: "0.2",
  filter: "blur(284px)",
  pointerEvents: "none",
};
const styles: Styles = {
  bgCircles: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: "-1",
    overflow: "hidden",
    ".circleTopLeft": {
      ...circleBase,
      top: 0,
      left: 0,
      transform: "translate(-40%, -40%)",
      width: "1000px",
      height: "1000px",
      background:
        "linear-gradient(270.27deg, #1B5FED 0.46%, #1B5FED 39.12%, #1B87ED 72.6%, #1B87ED 99.55%)",
    },
    ".circleBottomRight": {
      ...circleBase,
      bottom: 0,
      right: 0,
      transform: "translate(75%, 70%)",
      background:
        "linear-gradient(90deg, #FFC272 0%, #FFC272 34.41%, #FFE272 76.97%, #FFE272 99.99%)",
    },
  },
};

export default styles;
