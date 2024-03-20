import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
  useMemo,
} from 'react';

const WorkoutContext = createContext();

const useWorkoutContext = () => useContext(WorkoutContext);

function getNextPhaseState(previous, program) {
  switch (previous.currentPhase) {
    case 'start':
      return {
        ...previous,
        currentPhase: 'work',
      };

    case 'roundReset':
      return {
        ...previous,
        currentPhase: 'work',
      };

    case 'work':
      return {
        ...previous,
        currentPhase: 'rest',
      };

    case 'rest': {
      const isEndOfRound = previous.currentExercise === program.exercises - 1;
      const isEndOfProgram =
        isEndOfRound && previous.currentRound === program.rounds - 1;
      const nextExercise = (previous.currentExercise + 1) % program.exercises;

      if (isEndOfProgram) {
        return {
          currentPhase: 'end',
          currentExercise: nextExercise,
          currentRound: 0,
          active: false,
          ended: true,
        };
      }

      if (isEndOfRound) {
        return {
          currentPhase: 'roundReset',
          currentExercise: nextExercise,
          currentRound: previous.currentRound + 1,
          active: true,
          ended: false,
        };
      }

      return {
        currentPhase: 'work',
        currentExercise: nextExercise,
        currentRound: previous.currentRound,
        active: true,
        ended: false,
      };
    }
  }
}

function useWorkoutState(program) {
  const [workoutState, setworkoutState] = useState({
    currentPhase: 'start',
    currentExercise: 0,
    currentRound: 0,
    active: false,
    ended: false,
  });
  const currentPhase = useRef({
    name: null,
    duration: null,
    startTime: null,
    endTime: null,
    isActive: false,
  });

  const clearPhase = useCallback(() => {
    console.log('clear phase');

    currentPhase.current = {
      name: null,
      duration: null,
      startTime: null,
      endTime: null,
      isActive: false,
    };
  }, []);

  const startPhase = useCallback(
    (workoutState) => {
      console.log('start phase', workoutState.currentPhase);
      const duration = program[workoutState.currentPhase];
      // end previous phase
      if (currentPhase.current && currentPhase.current.timeout) {
        clearTimeout(currentPhase.current.timeout);
      }

      currentPhase.current = {
        name: workoutState.currentPhase,
        active: true,
        currentPhase: true,
        duration,
        startTime: Date.now(),
        endTime: Date.now() + duration,
        timeout: setTimeout(() => {
          setworkoutState(getNextPhaseState(workoutState, program));
        }, duration),
      };
    },
    [program]
  );

  const pausePhase = useCallback(() => {
    console.log('pause phase');

    if (currentPhase.current) {
      clearTimeout(currentPhase.current && currentPhase.current.timeout);
      const passedTime = Date.now() - currentPhase.current.startTime;
      currentPhase.current.remainingTime =
        currentPhase.current.duration - passedTime;
      currentPhase.current.active = false;
    }
  }, []);

  const resumePhase = useCallback(() => {
    console.log('resume phase');

    if (currentPhase.current.remainingTime) {
      currentPhase.current.timeout = setTimeout(() => {
        setworkoutState(getNextPhaseState(workoutState, program));
      }, currentPhase.current.remainingTime);
      currentPhase.current.active = true;
    }
  }, [program, workoutState]);

  useEffect(() => {
    if (workoutState.ended) {
      clearPhase();
      return;
    }
    if (
      workoutState.active &&
      workoutState.currentPhase !== currentPhase.current.name
    ) {
      startPhase(workoutState);
      return;
    }
    if (workoutState.active && !currentPhase.current.active) {
      resumePhase();
      return;
    }

    if (!workoutState.active && currentPhase.current.active) {
      pausePhase();
      return;
    }
  }, [clearPhase, pausePhase, resumePhase, workoutState, startPhase]);

  const start = useCallback(() => {
    setworkoutState({
      currentPhase: 'start',
      currentExercise: 0,
      currentRound: 0,
      active: true,
      ended: false,
    });
  }, []);

  const reset = useCallback(() => {
    setworkoutState({
      currentPhase: 'start',
      currentExercise: 0,
      currentRound: 0,
      active: false,
      ended: false,
    });
  }, []);

  const pause = useCallback(() => {
    setworkoutState({ ...workoutState, active: false });
  }, [workoutState]);

  const resume = useCallback(() => {
    setworkoutState({ ...workoutState, active: true });
  }, [workoutState]);

  return useMemo(
    () => ({
      start,
      reset,
      pause,
      resume,
      workoutState,
    }),
    [pause, reset, resume, workoutState, start]
  );
}

export function WorkoutProvider({ program, children }) {
  const workoutState = useWorkoutState(program);

  return (
    <WorkoutContext.Provider value={workoutState}>
      {children}
    </WorkoutContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWorkout() {
  return useWorkoutContext();
}
