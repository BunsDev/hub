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
    color: "polyNavPink",
    imgSrc: "/images/apis.svg",
    bg: "polyNavPinkBg",
    href: "/",
  },
  {
    title: "Playground",
    color: "polyNavGreen",
    imgSrc: "/images/playground.svg",
    bg: "polyNavGreenBg",
    href: "/query",
  },
  {
    title: "More",
    color: "polyNavYellow",
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
    bg: "polyNavPinkBg",
    authRequired: true,
  },
  logout: {
    title: "Logout",
    color: "polyNavBlue",
    imgSrc: "/images/logout.svg",
    bg: "polyNavBlueBg",
    authRequired: true,
  },
};
