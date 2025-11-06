import React from 'react'

function TopNavbar() {
  return (
    <div>
        <header className="bg-slate-800 text-white px-6 py-4 md:px-8 md:py-5 flex items-start justify-between">
        <div className="text-sm text-gray-200 font-medium mt-24">User()</div>
        <div className="flex flex-col items-center flex-1">
          <div className="font-bold text-xl md:text-2xl lg:text-3xl text-center">Vehicle Validator</div>
          <div className="text-base md:text-lg lg:text-xl text-amber-400 font-bold mt-1 text-center">Ganpati Infinity Society</div>
        </div>
        <div className="w-10"></div>
      </header>
    </div>
  )
}

export default TopNavbar