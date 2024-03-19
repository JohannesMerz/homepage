import { Link } from 'react-router-dom';

export function Component() {
  return (
    <div>
      <h2>Interval Timer</h2>
      <p>This site is currently under construction.</p>
      <Link to="/">Home</Link>
    </div>
  );
}
Component.displayName = 'IntervalTimer';
