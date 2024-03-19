import {
  createHashRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { ErrorPage } from './components/ErrorPage';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route path="/" lazy={() => import('./apps/home')} />
      <Route
        path="/interval-timer"
        lazy={() => import('./apps/interval-timer')}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
