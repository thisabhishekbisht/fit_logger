// src/App.tsx

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import Home from './pages/Home/Home';
import ActivityLogger from './pages/Logger/ActivityLogger';
import Header from './components/Layout/Header';
import SettingsModal from './components/Settings/SettingsModal';
import ExercisesPage from './pages/Exercise/ExerciseList';

const App: React.FC = () => {
  const [openSettings, setOpenSettings] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <Header onOpenSettings={() => setOpenSettings(true)} />
      <Routes>
        <Route path="/" element={<Home />} />                 
        <Route path="/log" element={<ActivityLogger />} />
        <Route path="/exercises" element={<ExercisesPage />} />
      </Routes>
      <SettingsModal isOpen={openSettings} onClose={() => setOpenSettings(false)} />
    </QueryClientProvider>
  );
};

export default App;

