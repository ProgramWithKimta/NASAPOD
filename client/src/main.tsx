import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Apod7day from './pages/Apod7Day';
import ApodRandom from './pages/ApodRandom';
import Calendar from './pages/Calendar';
import NotFound from './pages/NotFound';
import FavGallery from './pages/FavGallery';
// import ProtectedRoute from './auth/ProtectedRoute';
import { AuthProvider } from './auth/AuthProvider';

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
        path: '/Register',
        element: <Register />
      }, {
        path: '/Home',
        element: (
          // <ProtectedRoute>
            <Home />
          // </ProtectedRoute>
        )
      }, {
        path: '/Apod7day',
        element: (
          // <ProtectedRoute>
            <Apod7day />
          // </ProtectedRoute>
        )
      }, {
        path: '/ApodRandom',
        element: (
          // <ProtectedRoute>
            <ApodRandom />
          // </ProtectedRoute>
        )
      }, {
        path: '/Calendar',
        element: (
          // <ProtectedRoute>
            <Calendar />
          // </ProtectedRoute>
        )
      }, {
        path: '/FavGallery',
        element: (
          // <ProtectedRoute>
            <FavGallery />
          // </ProtectedRoute>
        ),
        caseSensitive: false
      },
    ],
  },
]);

const rootElement = document.getElementById('root');

if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;