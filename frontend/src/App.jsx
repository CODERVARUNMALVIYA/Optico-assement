import React from 'react'
import TopNavbar from './components/TopNavbar';
import BottomNavbar from './components/BottomNavbar';
import Home from './pages/Home';
import Add from './pages/Add';
import Update from './pages/Update';
import Admin from './pages/Admin';
import Display from './pages/Display';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
  <div className="min-h-screen flex flex-col bg-gray-50">
      <TopNavbar />
       <main className="flex-1 p-5 md:p-10 lg:p-12 flex flex-col items-center">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/update" element={<Update />} />
            <Route path="/display" element={<Display />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
        </main>
        <BottomNavbar />
    </div>
  )
}
