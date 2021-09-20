import { createContext, Dispatch, SetStateAction } from "react";
import { WindowSize } from "../hooks/useWindowSize";

type ResponsiveContextValue = {
  windowSize: WindowSize;
  mobile: { isMobile: boolean };
  mobileNav: {
    isMobileNavActive: boolean;
    setMobileNavActive: Dispatch<SetStateAction<boolean>>;
  };
};
const ResponsiveContext = createContext<ResponsiveContextValue>({
  windowSize: { width: null, height: null },
  mobile: { isMobile: false },
  mobileNav: {
    isMobileNavActive: false,
    setMobileNavActive: () => {},
  },
});

export default ResponsiveContext;
