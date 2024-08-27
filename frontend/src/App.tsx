import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import {  useSelector } from 'react-redux';
import { RootState, store } from './store';
import ProtectedRoute from './components/ProtectedRoutes';
import NotFoundPage from './pages/NotFoundPage';
const App: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  return (
    
      <BrowserRouter>
        <Routes>
        <Route path="/" element={userInfo ? <HomePage /> : <LoginPage />} />
          <Route path="/projects/:id" element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
          
        </Routes>
      </BrowserRouter>
    
  );
};

export default App;
