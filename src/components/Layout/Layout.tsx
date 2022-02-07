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
  useEffect(()=>{
    console.log('NEXT_PUBLIC_NETWORK_ID:', process.env.NEXT_PUBLIC_NETWORK_ID)
    console.log('NEXT_PUBLIC_IPFS_UPLOAD_ENDPOINT:', process.env.NEXT_PUBLIC_IPFS_UPLOAD_ENDPOINT)
    console.log('NEXT_PUBLIC_IPFS_API_KEY:', process.env.NEXT_PUBLIC_IPFS_API_KEY)
    console.log('NEXT_PUBLIC_IPFS_SECRET_API_KEY:', process.env.NEXT_PUBLIC_IPFS_SECRET_API_KEY)
    console.log('NEXT_PUBLIC_IPFS_GATEWAY:', process.env.NEXT_PUBLIC_IPFS_GATEWAY)
  },[])
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
