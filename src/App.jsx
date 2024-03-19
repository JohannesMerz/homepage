import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Home } from './domains/home';
import { ErrorPage } from './domains/error-pages';

const router = createHashRouter(
  [
    {
      path: '/',
      element: <Home />,
      errorElement: <ErrorPage />,
    },
  ],
  {}
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
