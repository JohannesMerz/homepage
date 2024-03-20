import { Link } from 'react-router-dom';
import { useWorkout, WorkoutProvider } from '../model';

export function Workout() {
  const currentWorkout = useWorkout();

  return (
    <WorkoutProvider>
      <div>
        <h2>Interval Timer</h2>
        {Object.entries(currentWorkout.sessionState).map(([key, value]) => (
          <p key={key}>
            {key}: {value.toString()}
          </p>
        ))}

        <p>
          <button onClick={currentWorkout.start}>start</button>
        </p>
        <p>
          {currentWorkout.sessionState.active ? (
            <button onClick={currentWorkout.pause}>pause</button>
          ) : (
            <button onClick={currentWorkout.resume}>resume</button>
          )}
        </p>
        <p>
          <button onClick={currentWorkout.reset}>reset</button>
        </p>
        <Link to="/">Home</Link>
      </div>
    </WorkoutProvider>
  );
}
