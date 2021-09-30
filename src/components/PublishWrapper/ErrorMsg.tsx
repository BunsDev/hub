/** @jsxImportSource theme-ui **/

import styles from "./styles";

type ErrorMsg = {
  children: React.ReactNode;
  bottomshift?: boolean;
};

// error component
const ErrorMsg = ({ children, bottomshift }: ErrorMsg) => (
  <span
    sx={{
      ...styles.errorMsg,
      position: bottomshift ? "relative" : "absolute",
    }}
  >
    {children}
  </span>
);

export default ErrorMsg;
