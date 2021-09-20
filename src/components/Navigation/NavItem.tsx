/** @jsxImportSource theme-ui **/
import React, { MouseEventHandler, useMemo } from "react";
import { Link } from "@theme-ui/components";
import { ThemeUIStyleObject } from "@theme-ui/css";

import { useRouter } from "hooks";
import { NavItem as NavItemType } from "./items";

const styles: { [key: string]: ThemeUIStyleObject } = {
  navLi: {
    transition: "background-color 0.5s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      width: "100%",
      height: "0.5rem",
      borderRadius: "4px",
      transition: "background-color 0.5s ease",
    },
    ">a": {
      p: "21.25px",
      pt: "34.25px",
      textDecoration: "none",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    span: {
      color: "white",
      fontSize: "1rem",
    },
  },
  expandableLi: {
    minWidth: "10rem",
    zIndex: 10,
    borderBottomLeftRadius: "0",
    borderBottomRightRadius: "0",
    "&:hover": {
      ".dropdown-content": {
        display: "flex",
      },
    },
    ".dropdown-content": {
      display: "none",
      flexDirection: "column",
      position: "absolute",
      top: "100%",
      bg: "inherit",
      width: "100%",
      p: "0 40px 14px 48px",
      borderBottomLeftRadius: ".25rem",
      borderBottomRightRadius: ".25rem",
      "&:hover": {
        display: "flex",
      },
      ">a": {
        mb: "1rem",
      },
    },
  },
};

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
    () => (expandable ? styles.expandableLi : ({} as ThemeUIStyleObject)),
    []
  );
  return (
    <li
      className={`navItem ${expandable ? "expandable" : ""} ${
        activeRoute === item.href ? "active" : ""
      }`}
      sx={{
        ...styles.navLi,
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
      <Link href={item?.href} sx={{ alignItems: "center" }}>
        {item.imgSrc && (
          <img
            src={item.imgSrc}
            alt={item.title + "icon"}
            sx={{ width: "1.25rem", height: "1.25rem" }}
          />
        )}
        <span className="text-nav" sx={{ ml: "8px" }}>
          {item.title}
        </span>
      </Link>
      {item?.children && (
        <div className="dropdown-content">
          {item.children.map((child) => (
            <Link key={child.title} href={child?.href}>{child.title}</Link>
          ))}
        </div>
      )}
    </li>
  );
};

export default NavItem;
