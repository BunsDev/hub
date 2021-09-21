/** @jsxImportSource theme-ui **/
import { useEffect, useState } from "react";
import { Global } from "@emotion/react";
import useSWR from "swr";

import { useStateValue, useWindowSize } from "hooks";
import { domain, RESPONSOVE_BREAKPOINTS } from "../../constants";
import { Header, BGCircles } from "components";
import { MobileNav } from "components/Layout/Navigation";
import { ResponsiveContext, ResponsiveProvider } from "hooks/useResponsive";

import styles from "./styles";
import getGlobalStyles from "./styles-global";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [_, dispatch] = useStateValue();

  const windowSize = useWindowSize();
  const [isMobile, setIsMobile] = useState(
    windowSize?.width <= RESPONSOVE_BREAKPOINTS.XSMALL || false
  );
  const [isMobileNavActive, setMobileNavActive] = useState(false);
  const { data: apis } = useSWR(domain + "/api/apis/active");
  // https://github.com/system-ui/theme-ui/issues/834#issuecomment-625865772

  useEffect(() => {
    if (apis && apis.apis) {
      dispatch({
        type: "SET_AVAILABLE_APIS",
        payload: apis.apis,
      });
    }
  }, [apis]);

  useEffect(() => {
    if (windowSize.width <= RESPONSOVE_BREAKPOINTS.XSMALL) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowSize.width]);

  return (
    <ResponsiveProvider
      value={{
        windowSize,
        mobile: { isMobile },
        mobileNav: { isMobileNavActive, setMobileNavActive },
      }}
    >
      <div className="layout" sx={styles.layout}>
        <Header />
        <main>{children}</main>
        <BGCircles />
        {windowSize.width <= RESPONSOVE_BREAKPOINTS.MEDIUM && <MobileNav />}
        <Global styles={(theme) => getGlobalStyles(theme)} />
      </div>
    </ResponsiveProvider>
  );
};
export default Layout;
