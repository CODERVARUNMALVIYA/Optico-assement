import React from 'react'
import TopNavbar from './components/TopNavbar';
import BottomNavbar from './components/BottomNavbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Add from './pages/Add';
import Update from './pages/Update';
import Display from './pages/Display';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
  <div className="min-h-screen flex flex-col bg-gray-50">
      <TopNavbar />
       <main className="flex-1 p-5 md:p-10 lg:p-12 flex flex-col items-center">
        <Routes>
            {/* Public route - All users can access after login */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute allowedRoles={['Guard', 'Admin', 'SuperAdmin']}>
                  <Home />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin and SuperAdmin only routes */}
            <Route 
              path="/add" 
              element={
                <ProtectedRoute allowedRoles={['Admin', 'SuperAdmin']}>
                  <Add />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/update" 
              element={
                <ProtectedRoute allowedRoles={['SuperAdmin']}>
                  <Update />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/display" 
              element={
                <ProtectedRoute allowedRoles={['Admin', 'SuperAdmin']}>
                  <Display />
                </ProtectedRoute>
              } 
            />
            
            {/* SuperAdmin only route */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['SuperAdmin']}>
                  <Admin />
                </ProtectedRoute>
              } 
            />
            
            {/* Login route - No protection */}
            <Route path="/login" element={<Login />} />
        </Routes>
        </main>
        <BottomNavbar />
    </div>
  )
}
