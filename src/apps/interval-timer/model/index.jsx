import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createTrackedSelector } from 'react-tracked';
import {
  updateProgress,
  startWorkout,
  pauseWorkout,
  setProgram,
  resumeWorkout,
  resetWorkout,
} from './atomics';

const workoutStore = create(
  immer((set) => ({
    setProgram: (program) => {
      set((state) => setProgram(state, program));
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

    program: null,

    workout: {
      currentExercise: 0,
      currentRound: 0,
      active: false,
      ended: false,
      progressMs: 0,
    },

    phase: null,
  }))
);

export const useWorkoutStore = createTrackedSelector(workoutStore);
