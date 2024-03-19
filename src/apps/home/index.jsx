import { Link } from 'react-router-dom';

export function Component() {
  return (
    <div>
      <h2>Personal homepage of Johannes Merz</h2>
      <p>This site is currently under construction.</p>
      <Link to="/interval-timer">Interval Timer</Link>
    </div>
  );
}
Component.displayName = 'Home';
