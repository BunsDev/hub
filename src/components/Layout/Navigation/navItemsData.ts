export interface NavItem {
  title: string;
  imgSrc?: string;
  color?: string;
  bg?: string;
  blank?: boolean;
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
      //{ title: "Favorites", authRequired: true },
      { title: "About", href: "https://polywrap.io/", blank: true },
      { title: "Docs", href: "https://docs.polywrap.io/", blank: true },
      { title: "Code", href: "https://github.com/polywrap", blank: true },
      { title: "Discord", href: "https://discord.gg/bGsqQrNhqd", blank: true },
      //{ title: "Analytics",href:"" },
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
