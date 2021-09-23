/** @jsxImportSource theme-ui **/
import { navItems } from "./navItemsData";
import styles from "./styles";

import { NavItem } from "components/Layout/Navigation";
import { useStateValue } from "hooks";

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
