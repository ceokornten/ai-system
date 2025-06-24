import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Admin from './pages/Admin.jsx';
import Navbar from './components/Navbar.jsx';

export default function App() {
  const token = localStorage.getItem('token');
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}
