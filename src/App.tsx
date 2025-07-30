// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import ActivityLogger from './pages/ActivityLogger';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />                 
      <Route path="/log" element={<ActivityLogger />} />
    </Routes>
  );
};

export default App;
