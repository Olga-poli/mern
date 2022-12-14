import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LinksPage from './pages/LinksPage';
import AuthPage from './pages/AuthPage';
import CreatePage from './pages/CreatePage';

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/links" element={<LinksPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/" element={<CreatePage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
    </Routes>
  );
};

export default useRoutes;
