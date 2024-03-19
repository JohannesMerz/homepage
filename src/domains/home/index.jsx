import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <p>I am home</p>
      <Link to="/something">something</Link>
    </div>
  );
}
