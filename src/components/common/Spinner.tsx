/** @jsxImportSource theme-ui **/
import React from "react";
import { ThemeUIStyleObject } from "@theme-ui/css";

const Spinner = ({ size }: { size?: "small" }) => {
  const style: ThemeUIStyleObject =
    size === "small" ? { width: "10px", height: "10px" } : {};
  return (
    <img
      src="/images/spinner.gif"
      alt="loading"
      sx={{ userSelect: "none", ...style }}
    />
  );
};

export default Spinner;
