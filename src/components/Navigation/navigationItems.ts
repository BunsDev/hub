export interface NavItem {
  title: string;
  imgSrc?: string;
  color?: string;
  bg?: string;
  href?: string;
  authRequired?: boolean;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    title: "Wrappers",
    color: "w3NavPink",
    imgSrc: "/images/apis.svg",
    bg: "w3NavPinkBg",
    href: "/",
  },
  {
    title: "Playground",
    color: "w3NavGreen",
    imgSrc: "/images/playground.svg",
    bg: "w3NavGreenBg",
    href: "/playground",
  },
  {
    title: "More",
    color: "w3NavYellow",
    imgSrc: "/images/dots-horizontal.svg",
    bg: "#4B401B",
    children: [
      { title: "Favorites", authRequired: true },
      { title: "About" },
      { title: "Docs" },
      { title: "Code" },
      { title: "Discord" },
      { title: "Analytics" },
    ],
  },
];

interface ConditionalNavItems {
  favorites: NavItem;
  logout: NavItem;
}

export const conditionalNavItems: ConditionalNavItems = {
  favorites: {
    title: "Favorites",
    color: "#EC467E",
    imgSrc: "/images/heart.svg",
    bg: "w3NavPinkBg",
    authRequired: true,
  },
  logout: {
    title: "Logout",
    color: "w3NavBlue",
    imgSrc: "/images/logout.svg",
    bg: "w3NavBlue",
    authRequired: true,
  },
};
