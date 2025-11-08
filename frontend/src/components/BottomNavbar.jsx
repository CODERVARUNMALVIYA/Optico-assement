import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function BottomNavbar() {
  const navigate = useNavigate()
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    // Get user role from localStorage on mount
    const loadUserRole = () => {
      const userData = localStorage.getItem('user')
      if (userData) {
        const user = JSON.parse(userData)
        setUserRole(user.role)
      } else {
        setUserRole(null)
      }
    }

    loadUserRole()

    // Listen for custom storage events (for same-tab updates)
    const handleStorageChange = () => {
      loadUserRole()
    }

    window.addEventListener('userLogin', handleStorageChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('userLogin', handleStorageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const handleRestrictedAccess = (e, requiredRoles, path) => {
    // Check if user is not logged in
    if (!userRole) {
      e.preventDefault()
      navigate('/login')
      return
    }

    // Check if user doesn't have required role
    if (!requiredRoles.includes(userRole)) {
      e.preventDefault()
      // Do nothing - just prevent navigation
    }
  }

  return (
    <nav className=" bottom-0 left-0 right-0 w-full bg-slate-800 shadow-lg flex justify-around px-4 py-4 md:px-6 md:py-4">
      {/* Home - All roles can access */}
      <Link className="flex flex-col items-center gap-1 text-slate-400 hover:text-gray-200 transition-colors" to="/">
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <div className="text-xs md:text-sm font-medium">Home</div>
      </Link>
      
      {/* Add - Only Admin and SuperAdmin */}
      <Link 
        className={`flex flex-col items-center gap-1 transition-colors ${
          userRole === 'Admin' || userRole === 'SuperAdmin' 
            ? 'text-slate-400 hover:text-gray-200' 
            : 'text-slate-600 opacity-50'
        }`}
        to="/add"
        onClick={(e) => handleRestrictedAccess(e, ['Admin', 'SuperAdmin'], '/add')}
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <div className="text-xs md:text-sm font-medium">Add Vehicle</div>
      </Link>
      
      {/* Display - Only Admin and SuperAdmin */}
      <Link 
        className={`flex flex-col items-center gap-1 transition-colors ${
          userRole === 'Admin' || userRole === 'SuperAdmin' 
            ? 'text-slate-400 hover:text-gray-200' 
            : 'text-slate-600 opacity-50'
        }`}
        to="/display"
        onClick={(e) => handleRestrictedAccess(e, ['Admin', 'SuperAdmin'], '/display')}
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
        </svg>
        <div className="text-xs md:text-sm font-medium">Display</div>
      </Link>
      
      {/* Update - Only SuperAdmin */}
      <Link 
        className={`flex flex-col items-center gap-1 transition-colors ${
          userRole === 'SuperAdmin' 
            ? 'text-slate-400 hover:text-gray-200' 
            : 'text-slate-600 opacity-50'
        }`}
        to="/update"
        onClick={(e) => handleRestrictedAccess(e, ['SuperAdmin'], '/update')}
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
        <div className="text-xs md:text-sm font-medium">Update</div>
      </Link>
      
      {/* Admin - Only SuperAdmin */}
      <Link 
        className={`flex flex-col items-center gap-1 transition-colors ${
          userRole === 'SuperAdmin' 
            ? 'text-slate-400 hover:text-gray-200' 
            : 'text-slate-600 opacity-50'
        }`}
        to="/admin"
        onClick={(e) => handleRestrictedAccess(e, ['SuperAdmin'], '/admin')}
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <div className="text-xs md:text-sm font-medium">Add Admin</div>
      </Link>
    </nav>
  )
}

export default BottomNavbar;