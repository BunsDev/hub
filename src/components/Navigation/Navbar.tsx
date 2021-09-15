/** @jsxImportSource theme-ui **/

import { Flex, useThemeUI } from "theme-ui";
import Link from "next/link";

import useRouter from "../../hooks/useRouter";
import NavItem from "./NavItem";
import { navItems } from "./navigationItems";
import { useStateValue } from "../../state/state";

const Navbar = () => {
  const [{ dapp }] = useStateValue();
  return (
    <nav
      role="nav"
      sx={{
        display: ["flex", "none"],
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        width: "100%",
      }}
    >
      <ul
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "4.5625rem",
        }}
      >
        {navItems.map((item) => {
          if (item.authRequired && !dapp.address) {
            return null;
          } else return <NavItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
