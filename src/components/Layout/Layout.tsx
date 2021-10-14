/** @jsxImportSource theme-ui **/
import { useEffect, useState } from "react";
import { Global } from "@emotion/react";
import useSWR from "swr";
import { useStateValue, useWindowSize } from "hooks";
import { Header, BGCircles } from "components";
import { MobileNav } from "components/Layout/Navigation";
import { ResponsiveProvider } from "hooks/useResponsive";
import { domain, RESPONSOVE_BREAKPOINTS } from "../../constants";

import getGlobalStyles from "./styles-global";
import styles from "./styles";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const windowSize = useWindowSize();
  return (
    <div className="layout" sx={styles.layout}>
      <Header />
      <main>{children}</main>
      <BGCircles />
      {windowSize.width <= RESPONSOVE_BREAKPOINTS.MEDIUM && <MobileNav />}
      <Global styles={(theme) => getGlobalStyles(theme)} />
    </div>
  );
};
export default Layout;
