/** @jsxImportSource theme-ui **/
import { Flex, Button } from "theme-ui";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Navbar } from "components/Layout/Navigation";
import SignInArea from "./SignInArea";
//const SignInArea = dynamic(() => import("./SignInArea"), { ssr: false });
import { useRouter, useResponsive } from "hooks";

import { RESPONSOVE_BREAKPOINTS } from "../../constants";
import styles from "./styles";

const Header = () => {
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
        {windowSize.moreThan(RESPONSOVE_BREAKPOINTS.MEDIUM) && <Navbar />}
      </Flex>
      {windowSize.lessOrEqualThan(RESPONSOVE_BREAKPOINTS.MEDIUM) ? (
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
          {router.pathname !== "/apis/create" && (
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
