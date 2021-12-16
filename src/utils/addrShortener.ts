import ReactHtmlParser from "react-html-parser";

export default function addrShortener(addr: string): any { // eslint-disable-line
  return ReactHtmlParser(
    addr.substring(0, 10) +
      "..." +
      addr.substring(addr.length - 4, addr.length - 1)
  );
}
