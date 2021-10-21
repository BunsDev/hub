import { useWindowSize } from "hooks";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { RESPONSOVE_BREAKPOINTS } from "src/constants";
import { WindowSize } from "./useWindowSize";

type ResponsiveContextValue = {
  windowSize: WindowSize;
  mobile: { isMobile: boolean };
  mobileNav: {
    isMobileNavActive: boolean;
    setMobileNavActive: Dispatch<SetStateAction<boolean>>;
  };
};

export const ResponsiveContext = createContext<ResponsiveContextValue>({
  windowSize: { width: null, height: null },
  mobile: { isMobile: false },
  mobileNav: {
    isMobileNavActive: false,
    setMobileNavActive: () => {}, // eslint-disable-line
  },
});

export const ResponsiveProvider = ({
  value,
  children,
}: {
  value?: ResponsiveContextValue;
  children: React.ReactNode;
}) => {
  const windowSize = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileNavActive, setMobileNavActive] = useState(false);

  useEffect(() => {
    if (windowSize.width <= RESPONSOVE_BREAKPOINTS.MEDIUM) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowSize.width]);

  const defaultValue: ResponsiveContextValue = {
    mobile: { isMobile },
    mobileNav: { isMobileNavActive, setMobileNavActive },
    windowSize,
  };
  return (
    <ResponsiveContext.Provider value={{ ...defaultValue, ...value }}>
      {children}
    </ResponsiveContext.Provider>
  );
};

const useResponsive = () => useContext(ResponsiveContext); // eslint-disable-line

export default useResponsive;
