import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';

const WorkoutContext = createContext();

export const WorkoutProvider = WorkoutContext.Provider;

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

export function useWorkout() {
  const program = useWorkoutContext();

  const [sessionState, setSessionState] = useState({
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
    (sessionState) => {
      console.log('start phase', sessionState.currentPhase);
      const duration = program[sessionState.currentPhase];
      // end previous phase
      if (currentPhase.current && currentPhase.current.timeout) {
        clearTimeout(currentPhase.current.timeout);
      }

      currentPhase.current = {
        name: sessionState.currentPhase,
        active: true,
        currentPhase: true,
        duration,
        startTime: Date.now(),
        endTime: Date.now() + duration,
        timeout: setTimeout(() => {
          setSessionState(getNextPhaseState(sessionState, program));
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
        setSessionState(getNextPhaseState(sessionState, program));
      }, currentPhase.current.remainingTime);
      currentPhase.current.active = true;
    }
  }, [program, sessionState]);

  useEffect(() => {
    if (sessionState.ended) {
      clearPhase();
      return;
    }
    if (
      sessionState.active &&
      sessionState.currentPhase !== currentPhase.current.name
    ) {
      startPhase(sessionState);
      return;
    }
    if (sessionState.active && !currentPhase.current.active) {
      resumePhase();
      return;
    }

    if (!sessionState.active && currentPhase.current.active) {
      pausePhase();
      return;
    }
  }, [clearPhase, pausePhase, resumePhase, sessionState, startPhase]);

  return {
    start: useCallback(() => {
      setSessionState({
        currentPhase: 'start',
        currentExercise: 0,
        currentRound: 0,
        active: true,
        ended: false,
      });
    }, []),
    reset: useCallback(() => {
      setSessionState({
        currentPhase: 'start',
        currentExercise: 0,
        currentRound: 0,
        active: false,
        ended: false,
      });
    }, []),
    pause: useCallback(() => {
      setSessionState({ ...sessionState, active: false });
    }, [sessionState]),
    resume: useCallback(() => {
      setSessionState({ ...sessionState, active: true });
    }, [sessionState]),
    sessionState,
  };
}
