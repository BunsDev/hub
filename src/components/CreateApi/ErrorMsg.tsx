/** @jsxImportSource theme-ui **/

type ErrorMsg = {
  children: React.ReactNode;
  bottomshift?: boolean;
};

// error component
const ErrorMsg = ({ children, bottomshift }: ErrorMsg) => (
  <span
    sx={{
      fontSize: "14px",
      lineHeight: "22px",
      letterSpacing: "-0.4000000059604645px",
      textAlign: "left",
      color: "rgba(255, 0, 0, 0.5)",
      mt: 2,
      position: bottomshift ? "relative" : "absolute",
    }}
  >
    {children}
  </span>
);

export default ErrorMsg;
