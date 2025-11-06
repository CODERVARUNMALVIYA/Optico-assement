import React from 'react'
import TopNavbar from './components/TopNavbar';
import BottomNavbar from './components/BottomNavbar';

export default function App() {
  return (
  <div className="min-h-screen flex flex-col bg-gray-50">
      <TopNavbar />
       <main className="flex-1 p-5 md:p-10 lg:p-12 flex flex-col items-center">
        </main>
        <BottomNavbar />
    </div>
  )
}
