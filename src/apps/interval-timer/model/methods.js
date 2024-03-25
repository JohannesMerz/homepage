// all functions in here manipulate a given state but don't call a setter on their own.
// This way we can combine them together easily, also easier to unit test the logic like this

import { lsSetObject } from './localStorage';

const TICK_TIME_MS = 10;

export function setSettings(state, settings) {
  lsSetObject('settings', settings);
  state.settings = settings;
}

export function startWorkout(state) {
  initWorkoutState(state, true);
  startInterval(state);
}

export function pauseWorkout(state) {
  stopInterval(state);
}

export function resumeWorkout(state) {
  startInterval(state);
}

export function resetWorkout(state) {
  stopInterval(state);
  initWorkoutState(state, false);
}

export function updateProgress(state) {
  const currentTime = Date.now();
  const amountPassedMs = currentTime - state.internal.lastTickTime;

  state.workout.progressMs = state.workout.progressMs + amountPassedMs;
  state.phase.progressMs = state.phase.progressMs + amountPassedMs;
  state.internal.lastTickTime = currentTime;

  if (state.phase.progressMs >= state.phase.duration) {
    setNextPhase(state);
  }
}

function initWorkoutState(state, active) {
  state.workout = {
    currentExercise: 0,
    currentRound: 0,
    active,
    ended: false,
    progressMs: 0,
  };

  state.phase = {
    name: 'start',
    duration: state.settings.start,
    progressMs: 0,
  };
}

function startInterval(state) {
  state.workout.active = true;
  state.internal.lastTickTime = Date.now();
  // calling update progress through the state itself as its async and comes with its own setter
  const updateProgressCb = state.internal.updateProgress;
  state.internal.interval = setInterval(updateProgressCb, TICK_TIME_MS);
}

function stopInterval(state) {
  clearInterval(state.internal.interval);
  state.internal.internal = null;
  state.workout.active = false;
}

function setNextPhase(state) {
  const isEndOfRound =
    state.workout.currentExercise === state.settings.exercises - 1;
  const isEndOfWorkout =
    isEndOfRound && state.workout.currentRound === state.settings.rounds - 1;

  switch (state.phase.name) {
    case 'start':
    case 'roundReset':
      state.phase.name = 'work';
      state.phase.duration = state.settings.work;
      state.phase.progressMs = 0;
      break;

    case 'work':
      if (isEndOfWorkout) {
        state.phase.name = 'end';
        state.phase.duration = 0;
        state.phase.progressMs = 0;

        state.workout.active = false;
        state.workout.ended = true;
        state.workout.progressMs =
          Math.floor(state.workout.progressMs / 1000) * 1000;

        stopInterval(state, false);

        break;
      }

      state.phase.name = 'rest';
      state.phase.duration = state.settings.rest;
      state.phase.progressMs = 0;
      break;

    case 'rest': {
      const nextExercise =
        (state.workout.currentExercise + 1) % state.settings.exercises;

      if (isEndOfRound) {
        state.phase.name = 'roundReset';
        state.phase.duration = state.settings.roundReset;
        state.phase.progressMs = 0;

        state.workout.currentExercise = 0;
        state.workout.currentRound = state.workout.currentRound + 1;

        break;
      }

      state.phase.name = 'work';
      state.phase.duration = state.settings.work;
      state.phase.progressMs = 0;

      state.workout.currentExercise = nextExercise;

      break;
    }
  }
}
