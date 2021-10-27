/** @jsxImportSource theme-ui **/
import { Flex, Button } from "theme-ui";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Navbar } from "components/Layout/Navigation";
const SignInArea = dynamic(() => import("./SignInArea"), { ssr: false });
import { useStateValue, useRouter, useResponsive } from "hooks";

import { RESPONSOVE_BREAKPOINTS } from "../../constants";
import styles from "./styles";

const Header = () => {
  const [{ dapp }, dispatch] = useStateValue();
  const {
    windowSize,
    mobileNav: { setMobileNavActive },
  } = useResponsive();
  const router = useRouter();

  return (
    <header role="header" sx={styles.header}>
      <Flex className="nav-wrap">
        <Link href="/">
          <a className="logo-wrap">
            <img src="/images/logo.svg" alt="logo" />
          </a>
        </Link>
        {windowSize.width > RESPONSOVE_BREAKPOINTS.MEDIUM && <Navbar />}
      </Flex>
      {windowSize.width <= RESPONSOVE_BREAKPOINTS.MEDIUM ? (
        <img
          src="/images/burger.svg"
          alt="nav-menu-button"
          onClick={(e) => {
            e.preventDefault();
            setMobileNavActive(true);
          }}
        />
      ) : (
        <Flex className="user-authorized">
          {dapp.address && router.pathname !== "/apis/create" && (
            <Button
              variant="primaryMedium"
              onClick={() => {
                void router.push("/apis/create?activeTab=create");
              }}
            >
              Publish Wrapper
            </Button>
          )}
          <SignInArea onDark />
        </Flex>
      )}
    </header>
  );
};

export default Header;
