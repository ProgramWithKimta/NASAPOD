import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Apod7Day from './pages/Apod7Day';
import ApodRandom from './pages/ApodRandom';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/gallery" element={<Apod7Day />} />
      <Route path="/random" element={<ApodRandom />} />
      {/* other routes here */}
    </Routes>
  </Router>
);

export default App;