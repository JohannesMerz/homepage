import { useWorkoutStore } from '../../model';
import { Button } from '../atomics/Button';
import { FiSettings, FiX } from 'react-icons/fi';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Field } from '../atomics/Field';

const SettingsInput = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  margin: 1rem;
  padding: 1rem;
  background-color: var(--colorSecondary);
  border: 2px solid var(--colorPrimary);
  border-radius: 6px;
  box-shadow: 0px 0px 4px var(--colorPrimary);
  z-index: 1000;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SettingsField = styled(Field).attrs((props) => ({
  ...props,
  type: 'number',
}))``;

const INITIAL_SETTINGS = {
  start: 10 * 1000,
  work: 10 * 1000,
  rest: 50 * 1000,
  roundReset: 10 * 1000,
  exercises: 5,
  rounds: 3,
};

function getInitialInput(settings) {
  return {
    ...settings,
    start: settings.start / 1000,
    work: settings.work / 1000,
    rest: settings.rest / 1000,
    roundReset: settings.roundReset / 1000,
  };
}

export function Settings() {
  const workoutStore = useWorkoutStore();

  const [settingsOpen, setSettingsOpen] = useState(false);

  const inputBufferRef = useRef(
    getInitialInput(workoutStore.settings || INITIAL_SETTINGS)
  );

  useEffect(() => {
    if (!workoutStore.settings) {
      workoutStore.setSettings(INITIAL_SETTINGS);
      setSettingsOpen(true);
    }
  }, [workoutStore]);

  const setFieldValue = (fieldName, value) => {
    workoutStore.setSettings({
      ...workoutStore.settings,
      [fieldName]: value,
    });
  };

  const onCountChange = (fieldName) => (e) => {
    inputBufferRef.current[fieldName] = e.target.value;
    const value = parseInt(e.target.value || '1');
    if (value < 1) {
      setFieldValue(fieldName, 1);
    } else {
      setFieldValue(fieldName, value);
    }
  };

  const onTimeChange = (fieldName) => (e) => {
    inputBufferRef.current[fieldName] = e.target.value;
    const value = parseInt(e.target.value || '0');

    setFieldValue(fieldName, value * 1000);
  };

  const open = () => {
    inputBufferRef.current = getInitialInput(
      workoutStore.settings || INITIAL_SETTINGS
    );
    setSettingsOpen(true);
  };

  return (
    <>
      <Button
        disabled={
          settingsOpen ||
          workoutStore.workout.active ||
          (workoutStore.workout.progressMs && workoutStore.phase.name !== 'end')
        }
        onClick={open}
      >
        <FiSettings size="28"></FiSettings>
      </Button>
      {settingsOpen && (
        <SettingsInput>
          <Header>
            <h2>Settings</h2>
            <Button onClick={() => setSettingsOpen(false)}>
              <FiX size="28"></FiX>
            </Button>
          </Header>
          <SettingsField
            label="Rounds:"
            value={inputBufferRef.current.rounds}
            onChange={onCountChange('rounds')}
          ></SettingsField>
          <SettingsField
            label="Exercises:"
            value={inputBufferRef.current.exercises}
            onChange={onCountChange('exercises')}
          ></SettingsField>
          <SettingsField
            label="Start(s):"
            value={inputBufferRef.current.start}
            onChange={onTimeChange('start')}
          ></SettingsField>
          <SettingsField
            label="Work(s):"
            value={inputBufferRef.current.work}
            onChange={onTimeChange('work')}
          ></SettingsField>
          <SettingsField
            label="Rest(s):"
            value={inputBufferRef.current.rest}
            onChange={onTimeChange('rest')}
          ></SettingsField>
          <SettingsField
            label="Reset(s):"
            value={inputBufferRef.current.roundReset}
            onChange={onTimeChange('roundReset')}
          ></SettingsField>
        </SettingsInput>
      )}
    </>
  );
}
