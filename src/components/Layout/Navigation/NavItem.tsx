/** @jsxImportSource theme-ui **/
import { MouseEventHandler, useMemo } from "react";
import { ThemeUIStyleObject } from "@theme-ui/css";
import Link from "next/link";
import { useRouter } from "hooks";
import { NavItem as NavItemType } from "./navItemsData";

import styles from "./styles";

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
      {"href" in item ? (
        <Link href={item.href} shallow>
          <a>
            {item.imgSrc && <img src={item.imgSrc} alt={item.title + "icon"} />}
            <span className="text-nav">{item.title}</span>
          </a>
        </Link>
      ) : (
        <a>
          {item.imgSrc && <img src={item.imgSrc} alt={item.title + "icon"} />}
          <span className="text-nav">{item.title}</span>
        </a>
      )}
      {item?.children && (
        <div className="dropdown-content">
          {item.children.map((child) =>
            "href" in child ? (
              <a
                key={child.title}
                href={child?.href}
                target="_blank"
                rel="noreferrer"
              >
                {child.title}
              </a>
            ) : (
              <a key={child.title}>{child?.title}</a>
            )
          )}
        </div>
      )}
    </li>
  );
};

export default NavItem;
