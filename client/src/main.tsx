import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Apod7Day from './pages/Apod7Day';
import ApodRandom from './pages/ApodRandom';

import App from './App';
import Home from './pages/Home';
import Matchup from './pages/SCMatchup';
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
        element: <Home />
      }, {
        path: '/matchup',
        element: <Matchup />
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

export default App;