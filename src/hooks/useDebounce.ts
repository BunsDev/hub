import { useEffect, useRef, useState } from "react";

export default function useDebounce(
  value: string,
  delay: number,
  defaultValue?: string
) {
  // eslint-disable-line
  const [debouncedValue, setDebouncedValue] = useState(defaultValue || value);
  const prevValue = useRef<string>();

  useEffect(() => {
    if (typeof value !== "undefined") {
      prevValue.current = debouncedValue;
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [value]);

  return [debouncedValue];
}
