import { createContext, Dispatch, SetStateAction, useContext } from "react";
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
    setMobileNavActive: () => {},
  },
});

export const ResponsiveProvider = ({
  value,
  children,
}: {
  value: ResponsiveContextValue;
  children: React.ReactNode;
}) => {
  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
};

const useResponsive = () => useContext(ResponsiveContext); // eslint-disable-line

export default useResponsive;
