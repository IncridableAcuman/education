import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Dashboard } from '../pages/Dashboard';
import { Applications } from '../pages/Applications';
import { Courses } from '../pages/Courses';
import { Students } from '../pages/Students';
import { Settings } from '../pages/Settings';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ForgotPassword } from '../pages/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword';


export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />

      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="applications" element={<Applications />} />
        <Route path="courses" element={<Courses />} />
        <Route path="students" element={<Students />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};