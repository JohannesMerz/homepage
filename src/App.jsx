import {
  createHashRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import { ErrorPage } from './components/ErrorPage';
import { homeRoutes } from './apps/home/routes';

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route path="home">{homeRoutes}</Route>
      <Route index element={<Navigate to="/home" replace />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
