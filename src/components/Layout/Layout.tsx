/** @jsxImportSource theme-ui **/
import { Global } from "@emotion/react";
import { useRouter, useWindowSize } from "hooks";
import { Header, BGCircles } from "components";
import { MobileNav } from "components/Layout/Navigation";
import { RESPONSOVE_BREAKPOINTS } from "../../constants";
import { useLoading } from "hooks/useLoading";
import getGlobalStyles from "./styles-global";
import styles from "./styles";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const windowSize = useWindowSize();
  const router = useRouter();
  const withLoading = useLoading(!router.isReady);

  return (
    <div className="layout" sx={styles.layout}>
      <BGCircles />
      <Global styles={(theme) => getGlobalStyles(theme)} />
      {withLoading(
        <>
          <Header />
          <main>{children}</main>
          {windowSize.lessOrEqualThan(RESPONSOVE_BREAKPOINTS.MEDIUM) && (
            <MobileNav />
          )}
        </>
      )}
    </div>
  );
};

export default Layout;
