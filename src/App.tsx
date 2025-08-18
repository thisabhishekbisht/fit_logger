// src/App.tsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import ActivityLogger from './pages/Logger/ActivityLogger';
import Header from './components/Layout/Header';
import SettingsModal from './components/Settings/SettingsModal';

const App: React.FC = () => {
  const [openSettings, setOpenSettings] = useState(false);
  return (
    <>
      <Header onOpenSettings={() => setOpenSettings(true)} />
      <Routes>
        <Route path="/" element={<Home />} />                 
        <Route path="/log" element={<ActivityLogger />} />
      </Routes>
      <SettingsModal isOpen={openSettings} onClose={() => setOpenSettings(false)} />
    </>
  );
};

export default App;
