import React, { useState } from 'react';
import './App.css';
import Layout from './Layout';
import Dashboard from './Screens/components/Dashboard';
import AdminFinder from './Screens/components/AdminFinder';
import AdminDashboard from './Screens/components/AdminDashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import InvalidPage from './Screens/components/InvalidPage';
import Login from './Screens/components/Login';
import { AuthProvider } from './Screens/store/AuthContext';
import GlobalStateProvider from './Screens/store/GlobalContext';
import ProtectedRoute from './Screens/components/ProtectedRoute';
import Signup from './Screens/components/Signup';

function App() {
  
  return (
    <div style={{height: '100%'}}>
      <AuthProvider>
        <GlobalStateProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>
              <Route element={<Layout/>}>
                <Route path='/' element={<Navigate to={"/dashboard"} replace/>} />
                <Route path='/dashboard' element={
                  <ProtectedRoute>
                    <Dashboard/>
                  </ProtectedRoute>
                  }/>
                <Route path='admin'>
                  <Route index path='admin_dashboard' element={
                    <ProtectedRoute>
                      <AdminFinder/>
                    </ProtectedRoute>
                  } />
                  <Route path=':library' element={
                    <ProtectedRoute>
                      <AdminDashboard/>
                    </ProtectedRoute>
                  } />
                </Route>
                <Route path="*" element={<InvalidPage />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </GlobalStateProvider>
        
      </AuthProvider>
    </div>
  )
}

export default App
