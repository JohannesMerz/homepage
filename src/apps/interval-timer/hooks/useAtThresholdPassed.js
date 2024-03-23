import { useCallback } from 'react';
import { useValueChange } from './useValueChange';

export function useAtThresholdPassed(direction, threshold, value, cb) {
  return useValueChange(
    value,
    useCallback(
      (currentValue, prevValue) => {
        if (direction === 'desc') {
          if (currentValue <= threshold && prevValue > threshold) {
            cb();
          }
        }
        if (direction === 'asc') {
          if (prevValue <= threshold && currentValue > threshold) {
            cb();
          }
        }
      },
      [cb, threshold, direction]
    )
  );
}
