/** @jsxImportSource theme-ui **/
import { Global } from "@emotion/react";
import { useWindowSize } from "hooks";
import { Header, BGCircles } from "components";
import { MobileNav } from "components/Layout/Navigation";
import { RESPONSOVE_BREAKPOINTS } from "../../constants";

import getGlobalStyles from "./styles-global";
import styles from "./styles";
import { useEffect } from "react";

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
      {windowSize.lessOrEqualThan(RESPONSOVE_BREAKPOINTS.MEDIUM) && <MobileNav />}
      <Global styles={(theme) => getGlobalStyles(theme)} />
    </div>
  );
};
export default Layout;
