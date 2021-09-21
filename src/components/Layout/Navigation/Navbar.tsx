/** @jsxImportSource theme-ui **/
import { NavItem } from "components/Layout/Navigation";
import { navItems } from "./navItemsData";
import { useStateValue } from "hooks";

import styles from "./styles";

const Navbar = () => {
  const [{ dapp }] = useStateValue();
  return (
    <nav role="nav" sx={styles.navBar}>
      <ul>
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
