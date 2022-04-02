/** @jsxImportSource theme-ui **/

import styles from "./styles";

type ErrorMsg = {
  children: React.ReactNode;
  center?: boolean;
};

// error component
const ErrorMsg = ({ children, center }: ErrorMsg) => (
  <span
    sx={{
      ...styles.errorMsg,
      margin: center ? "0 auto" : "auto",
      marginTop: "10px",
    }}
  >
    {children}
  </span>
);

export default ErrorMsg;
