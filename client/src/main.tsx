import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Apod7Day from './pages/Apod7Day';
import ApodRandom from './pages/ApodRandom';

import App from './App';
import Login from './pages/Login';
import Home from './pages/Home';
import Apod7day from './pages/Apod7Day';
import ApodRandom from './pages/ApodRandom';
import Calendar from './pages/Calendar';
import FavGallery from './pages/FavoritePhotos';
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
        path: '/Apod7day',
        element: <Apod7day />
      }, {
        path: '/ApodRandom',
        element: <ApodRandom />
      }, {
        path: '/Calendar',
        element: <Calendar />
      }, {
        path: '/FavGallery',
        element: <FavGallery />
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

export default App;