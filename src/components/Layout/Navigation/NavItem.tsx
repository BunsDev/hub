/** @jsxImportSource theme-ui **/
import { NavItem as NavItemType } from "./navItemsData";
import styles from "./styles";

import { MouseEventHandler, useMemo } from "react";
import { Link } from "@theme-ui/components";
import { ThemeUIStyleObject } from "@theme-ui/css";
import { useRouter } from "hooks";

const NavItem = ({
  item,
  onClick,
}: {
  item: NavItemType;
  onClick?: MouseEventHandler<HTMLLIElement>;
}) => {
  const { activeRoute } = useRouter();
  const expandable = useMemo(() => !!item.children, []);
  const expandableSx = useMemo(
    () => (expandable ? styles.expandableNavItem : ({} as ThemeUIStyleObject)),
    []
  );
  return (
    <li
      className={`navItem ${expandable ? "expandable" : ""} ${
        activeRoute === item.href ? "active" : ""
      }`}
      sx={{
        ...styles.navItem,
        svg: {
          stroke: item?.color,
          mr: "14px",
        },
        "&:hover, &.active": {
          backgroundColor: item?.bg,
          "&:before": {
            backgroundColor: item?.color,
          },
        },
        ".dropdown-content::before": {
          backgroundColor: item?.color,
        },
        ...expandableSx,
      }}
      onClick={onClick}
    >
      <Link href={item?.href}>
        {item.imgSrc && <img src={item.imgSrc} alt={item.title + "icon"} />}
        <span className="text-nav">{item.title}</span>
      </Link>
      {item?.children && (
        <div className="dropdown-content">
          {item.children.map((child) => (
            <Link key={child.title} href={child?.href}>
              {child.title}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
};

export default NavItem;
