// Adapted from https://usehooks.com/useLocalStorage/
import { useRef, useState } from 'react';

export function useLocalStorage(key, initialValue, { timeout = 0 } = {}) {
  const debouncedSetStateRef = useRef(null);
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      // console.error(err);

      return initialValue;
    }
  });

  function setValue(value) {
    clearTimeout(debouncedSetStateRef.current);

    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        debouncedSetStateRef.current = setTimeout(() => {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }, timeout);
      }
    } catch (err) {
      // console.error(err);
    }
  }

  return [storedValue, setValue];
}
