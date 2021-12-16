/** @jsxImportSource theme-ui **/
import { ThemeUIStyleObject } from "@theme-ui/css";
import { number } from "joi";

const spinnerSizes = {
  small: { width: "10px", height: "10px" },
  full: { width: "auto", height: "100%" },
};
const Spinner = ({ size }: { size?: "small" | "full" | number }) => {
  return (
    <img
      src="/images/spinner.gif"
      alt="loading"
      sx={{
        userSelect: "none",
        ...(typeof size === "number"
          ? { width: `${size}px`, height: `${size}px` }
          : spinnerSizes[size]),
      }}
    />
  );
};

export default Spinner;
