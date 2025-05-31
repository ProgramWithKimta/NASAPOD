import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Login from './pages/Login';
import Home from './pages/Home';
import Vote from './pages/SCVote';
import NotFound from './pages/SCNotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Login />
      }, {
        path: '/Home',
        element: <Home />
      }, {
        path: '/matchup/:id',
        element: <Vote />
      },
    ],
  },
]);

const rootElement = document.getElementById('root');

if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}

