import React, { useState, useEffect } from 'react'
import { logout } from '../services/authService'
import { useNavigate } from 'react-router-dom'

function TopNavbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get user from localStorage on mount
    const loadUser = () => {
      const userData = localStorage.getItem('user')
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }

    loadUser()

    // Listen for custom storage events (for same-tab updates)
    const handleStorageChange = () => {
      loadUser()
    }

    window.addEventListener('userLogin', handleStorageChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('userLogin', handleStorageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/login')
    }
  }

  return (
    <div>
        <header className="bg-slate-800 text-white px-6 py-4 md:px-8 md:py-5 flex items-start justify-between">
        <div className="flex flex-col items-start">
          <div className="text-sm text-gray-200 font-medium">{user?.fullName || 'User'}</div>
          <div className="text-xs text-amber-500 font-medium">({user?.role || 'Role'})</div>
        </div>
        
        <div className="flex flex-col items-center flex-1">
          <div className="font-bold text-xl md:text-2xl lg:text-3xl text-center">Vehicle Validator</div>
          <div className="text-base md:text-lg lg:text-xl text-amber-500 font-bold mt-1 text-center">Ganpati Infinity Society</div>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center hover:bg-slate-700 rounded-lg p-2 transition-colors group"
          title="Logout"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-6 h-6 md:w-7 md:h-7 text-red-400 group-hover:text-red-300"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" 
            />
          </svg>
          <span className="text-xs text-red-400 group-hover:text-red-300 mt-1">Logout</span>
        </button>
      </header>
    </div>
  )
}

export default TopNavbar