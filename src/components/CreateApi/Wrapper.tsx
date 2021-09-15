/** @jsxImportSource theme-ui **/

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    sx={{
      mt: "3.125rem",
      ".inputwrap": {
        width: "max-content",
        input: {
          width: "30.6875rem",
          bg: "#1F1F20",
        },
        "&:after": {
          display: "block",
          position: "absolute",
          right: ".75rem",
          top: "calc(50% - 11px)",
          content: "''",
          width: "22px",
          height: "22px",
        },
        "&.loading": {
          "&:after": {
            animation: "rotate 1s infinite linear",
            background: "url(/images/loading.svg) no-repeat",
          },
        },
        "&.available, &.success": {
          "&:after": {
            background: "url(/images/check-circle.svg) no-repeat",
          },
        },
        "&.registered": {
          "&:after": {
            background: "url(/images/check-circle-green.svg) no-repeat",
          },
        },
        "&.error": {
          input: {
            borderColor: "rgba(255, 0, 0, 0.5)",
          },
          "&:after": {
            background: "url(/images/fail.svg) no-repeat",
          },
        },
      },
    }}
  >
    {children}
  </div>
);
