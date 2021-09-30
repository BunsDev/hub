import { useState, useEffect } from "react";

export interface WindowSize {
  width: number;
  height: number;
}
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: null,
    height: null,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
};
export default useWindowSize;
