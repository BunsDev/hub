import { WindowSize } from "./useWindowSize";

import { createContext, Dispatch, SetStateAction, useContext } from "react";

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
  value: ResponsiveContextValue;
  children: React.ReactNode;
}) => {
  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsive = () => useContext(ResponsiveContext);

export default useResponsive;
