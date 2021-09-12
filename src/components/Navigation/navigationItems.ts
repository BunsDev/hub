export interface NavItem {
  title: string;
  imgSrc?: string;
  color?: string;
  bg?: string;
  href?: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
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
      { title: "Favorites" },
      { title: "About" },
      { title: "Docs" },
      { title: "Code" },
      { title: "Discord" },
      { title: "Analytics" },
    ],
  },
];

export default navItems;
