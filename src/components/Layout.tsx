/** @jsxImportSource theme-ui **/
import { timing } from "../theme";
import { useStateValue } from "../state/state";
import { domain } from "../constants";

import { useEffect } from "react";
import { Global } from "@emotion/react"; // eslint-disable-line
import useSWR from "swr";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [, dispatch] = useStateValue();
  const { data: apis } = useSWR(
    domain + "/api/apis/search?limit=10&page=1&query="
  );
  // https://github.com/system-ui/theme-ui/issues/834#issuecomment-625865772
  const pageLevelAnimationTiming = timing[3] + "s";

  useEffect(() => {
    if (apis && apis.apis) {
      dispatch({
        type: "SET_AVAILABLE_APIS",
        payload: apis.apis,
      });
    }
  }, [apis]);

  return (
    <div
      className="layout"
      sx={{
        overflow: "hidden",
        "&::before, &::after": {
          display: "none",
        },
        background: "#1E1D22",
      }}
    >
      {children}
      <Global
        styles={(theme: any) => ({ // eslint-disable-line
          "@keyframes shift": {
            from: { transform: "translate(-10px, 0)" },
            to: { transform: "translate(0, 0)" },
          },
          "*": {
            boxSizing: "border-box",
            position: "relative",
            outline: "none",
            "*::before, *::after": {
              boxSizing: "border-box",
              position: "relative",
            },
          },
          html: {
            scrollBehavior: "smooth",
            fontSize: "100%",
            WebkitTextSizeAdjust: "100%", // eslint-disable-line
            fontVariantLigatures: "none",
            WebkitFontVariantLigatures: "none", // eslint-disable-line
            textRendering: "optimizeLegibility",
            MozOsxFontSmoothing: "grayscale", // eslint-disable-line
            fontSmoothing: "antialiased",
            WebkitFontSmoothing: "antialiased", // eslint-disable-line
            textShadow: "rgba(0, 0, 0, 0.01) 0 0 0.0625rem",
            "&::before, &::after": {
              display: "none",
            },
          },
          body: {
            minHeight: "100vh",
            scrollBehavior: "smooth",
            margin: "0",
            padding: "0",
            overflow: "hidden",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundAttachment: "scroll",
            background: theme.colors.w3hazeGradient,
          },
          "body::before": {
            display: "none",
            zIndex: -1,
            position: "absolute",
            content: "''",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundAttachment: "scroll",
          },
          "body::after": {
            display: "none",
            zIndex: -1,
            position: "absolute",
            content: "''",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundAttachment: "scroll",
          },
          main: {
            overflowX: "hidden",
            flex: 1,
            display: "flex",
            alignItems: "center",
          },
          fieldset: {
            padding: 0,
            border: "none",
          },
          code: {
            m: 0,
            fontFamily: "monospace",
          },
          table: {
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
          },
          th: {
            textAlign: "left",
            borderBottomStyle: "solid",
          },
          td: {
            textAlign: "left",
            borderBottomStyle: "solid",
          },
          pre: {
            overflowX: "auto",
            padding: ".5rem 1rem",
            borderRadius: "8px",
            backgroundColor: theme.colors.w3Grey3,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "150%",
            color: "#FFF",
            code: {
              color: "inherit",
            },
          },
          ".contents": {
            width: "100%",
            height: "100%",
            padding: "0 4.6875rem",
          },
          ".contents.animate": {
            animation: `fadeIn ${pageLevelAnimationTiming}, shift ${pageLevelAnimationTiming}`,
          },
          "ul, ol, li": {
            margin: "0",
            padding: "0",
            listStyle: "none",
          },
          'a, Button, [type="Button"], [type="reset"], [type="submit"], [type="file"], [type="file"]::-webkit-file-upload-Button':
            {
              textTransform: "none",
              appearance: "none",
              cursor: "pointer",
              textDecoration: "none",
            },
          "a:visited, a:active": {
            textDecoration: "none",
          },
          "img, svg, picture, span, a, b, u, i, small, sub, strong, label": {
            display: "inline-block",
          },
          "table, thead, tbody, tfoot, tr, td, th": {
            borderSpacing: "0",
            borderCollapse: "collapse",
            textAlign: "left",
          },
          "table tbody tr:nth-of-type(even)": {
            background: "rgba(255, 255, 255, 0.04)",
          },
          "table tbody tr:hover": {
            background: "rgba(255, 255, 255, 0.04)",
          },
          ".text-nav": {
            fontSize: "0.75rem",
            lineHeight: "0.875rem",
            letterSpacing: "-0.0375rem",
            textTransform: "uppercase",
            textDecoration: "none",
            color: theme.colors.w3TextNavTeal,
          },
          ".bn-onboard-custom": {
            zIndex: 100000,
          },
        })}
      />
    </div>
  );
};
export default Layout;
