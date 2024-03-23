import { useEffect, useRef } from 'react';

export function useValueChange(value, cb) {
  const prev = useRef(value);
  useEffect(() => {
    if (value !== prev.current) {
      cb(value, prev.current);
      prev.current = value;
    }
  }, [cb, value]);
}
