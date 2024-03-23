/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useRef } from 'react';
import { createAudioContext } from '../lib/sound';

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const soundRef = useRef({
    create: () => (soundRef.current.soundApi = createAudioContext()),
  });

  return (
    <SoundContext.Provider value={soundRef.current}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  return context.soundApi;
}

export function useInitSound() {
  const context = useContext(SoundContext);
  return context.create;
}
