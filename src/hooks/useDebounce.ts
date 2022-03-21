import { useEffect, useRef, useState } from "react";

export default function useDebounce(value: any, delay: number) {
  // eslint-disable-line
  const [debouncedValue, setDebouncedValue] = useState(value);
  const prevValue = useRef();

  useEffect(() => {
    prevValue.current = debouncedValue;
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return [debouncedValue, prevValue.current];
}
