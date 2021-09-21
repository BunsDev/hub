/** @jsxImportSource theme-ui **/
import { NavItem } from "components/Layout/Navigation";
import { navItems } from "./navItemsData";
import { useStateValue } from "hooks";

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
