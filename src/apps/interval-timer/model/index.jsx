import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createTrackedSelector } from 'react-tracked';
import {
  updateProgress,
  startWorkout,
  pauseWorkout,
  setSettings,
  resumeWorkout,
  resetWorkout,
} from './methods';
import { lsGetObject } from './localStorage';

const workoutStore = create(
  immer((set) => ({
    setSettings: (settings) => {
      set((state) => setSettings(state, settings));
    },
    startWorkout: () => {
      set(startWorkout);
    },
    pauseWorkout: () => {
      set(pauseWorkout);
    },
    resumeWorkout: () => {
      set(resumeWorkout);
    },
    resetWorkout: () => {
      set(resetWorkout);
    },

    internal: {
      interval: null,
      lastTickTime: null,
      updateProgress: () => {
        set(updateProgress);
      },
    },

    settings: lsGetObject('settings'),

    workout: {
      currentExercise: 0,
      currentRound: 0,
      active: false,
      ended: false,
      progressMs: 0,
    },

    phase: {
      name: 'start',
      duration: lsGetObject('settings')?.start || 0,
      progressMs: 0,
    },
  }))
);

export const useWorkoutStore = createTrackedSelector(workoutStore);
