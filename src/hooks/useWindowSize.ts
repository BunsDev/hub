import { useState, useEffect, useCallback } from "react";

export interface WindowSize {
  width: number;
  height: number;
  moreThan: (width: number) => boolean;
  lessOrEqualThan: (width: number) => boolean;
}
export interface WindowSizeState {
  width: number;
  height: number;
}
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSizeState>({
    width: null,
    height: null,
  });

  const moreThan = useCallback(
    (width: number) =>
      typeof windowSize.width === "number" && windowSize.width > width,
    [windowSize.width]
  );
  const lessOrEqualThan = useCallback(
    (width: number) =>
      typeof windowSize.width === "number" && windowSize.width <= width,
    [windowSize.width]
  );

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
  return { ...windowSize, moreThan, lessOrEqualThan };
};
export default useWindowSize;
