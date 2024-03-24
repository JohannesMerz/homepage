import { useCallback, useMemo, useState } from 'react';
import { useSound } from '../../hooks/useSound';
import { useValueChange } from '../../hooks/useValueChange';
import { useWorkoutStore } from '../../model';
import { useAtThresholdPassed } from '../../hooks/useAtThresholdPassed';
import { Button } from '../atomics/Button';
import { FiVolumeX, FiVolume1, FiVolume2 } from 'react-icons/fi';

export function Sounds() {
  const workoutStore = useWorkoutStore();
  const soundApi = useSound();

  const [globalVolume, setGlobalVolume] = useState(1);
  const [playing, setPlaying] = useState(false);

  const withSoundEnv = useCallback(
    (fn) => {
      const playNote = async (props) => {
        setPlaying(true);
        const result = await soundApi.playNote({
          ...props,
          volume: props.volume * globalVolume,
        });
        setPlaying(false);
        return result;
      };

      return (...args) => fn(playNote, ...args);
    },
    [globalVolume, soundApi]
  );

  const playStartNote = useMemo(
    () =>
      withSoundEnv((playNote, phase) => {
        switch (phase) {
          case 'work':
          case 'rest':
          case 'roundReset':
          case 'end':
            return playNote({
              note: 'A',
              octave: 5,
              type: 'sine',
              duration: 660,
              volume: 0.8,
            });
        }
      }),
    [withSoundEnv]
  );

  const playCountdownNote = useMemo(
    () =>
      withSoundEnv((playNote) => {
        if (workoutStore.phase.duration > 5000) {
          switch (workoutStore.phase.name) {
            case 'start':
            case 'work':
            case 'rest':
            case 'roundReset':
              return playNote({
                note: 'A',
                octave: 4,
                type: 'sine',
                duration: 660,
                volume: 0.5,
              });
          }
        }
      }),
    [withSoundEnv, workoutStore.phase.duration, workoutStore.phase.name]
  );

  const playGetReadyNote = useMemo(
    () =>
      withSoundEnv((playNote) => {
        if (workoutStore.phase.duration > 5000) {
          switch (workoutStore.phase.name) {
            case 'start':
            case 'rest':
            case 'roundReset':
              return playNote({
                note: 'A',
                octave: 4,
                type: 'sine',
                duration: 660,
                volume: 0.5,
              });
          }
        }
      }),
    [withSoundEnv, workoutStore.phase.duration, workoutStore.phase.name]
  );

  const timeLeftMs =
    workoutStore.phase.duration - workoutStore.phase.progressMs;

  useAtThresholdPassed('desc', 5000, timeLeftMs, playGetReadyNote);
  useAtThresholdPassed('desc', 2000, timeLeftMs, playCountdownNote);
  useAtThresholdPassed('desc', 1000, timeLeftMs, playCountdownNote);

  useValueChange(workoutStore.phase.name, playStartNote);

  const SoundIcon =
    globalVolume === 0 ? FiVolumeX : playing === true ? FiVolume2 : FiVolume1;

  return (
    <Button
      disabled={soundApi && !soundApi?.apiEnabled}
      onClick={() => setGlobalVolume(globalVolume === 0 ? 1 : 0)}
    >
      <SoundIcon size="28"></SoundIcon>
    </Button>
  );
}
