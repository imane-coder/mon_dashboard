import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EventConsumptionList from './pages/EventConsumptionList';
import ForgotPassword from './pages/ForgotPassword';
import EquipmentManagement from './pages/EquipementManagement';
import EquipementsMateriels from './pages/EquipementsMateriels';
import Statistique from './pages/Statistique';
import Layout from './components/layout';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#121212' : '#FFFFFF';
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode: boolean) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const handleSignIn = () => {
    console.log('Sign In clicked');
  };

  return (
    <Layout
      onMenuClick={() => setSidebarOpen(!sidebarOpen)}
      onThemeToggle={handleThemeToggle}
      isDarkMode={isDarkMode}
      sidebarOpen={sidebarOpen}
      onSidebarClose={() => setSidebarOpen(false)}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/EventConsumptionList" element={<EventConsumptionList />} />
        <Route path="/EquipmentManagement" element={<EquipmentManagement />} />
        <Route path="/EquipementsMateriels" element={<EquipementsMateriels />} />
        <Route path="/statistique" element={<Statistique />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Layout>
  );
};

export default App;
