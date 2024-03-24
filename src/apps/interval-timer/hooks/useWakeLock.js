import { useMemo, useRef } from 'react';

export function useWakeLock() {
  const ref = useRef();

  return useMemo(
    () => ({
      requestWakeLock: async () => {
        // create an async function to request a wake lock
        try {
          if (!ref.current) {
            console.log('request wake lock');
            ref.current = await navigator.wakeLock.request('screen');
          }
        } catch (err) {
          console.error('wake lock request failed');
        }
      },
      releaseWakeLock: async () => {
        // create an async function to request a wake lock
        try {
          if (ref.current) {
            console.log('release wake lock');
            await ref.current?.release();
            ref.current = null;
          }
        } catch (err) {
          console.error('wake lock release failed');
        }
      },
    }),
    []
  );
}
