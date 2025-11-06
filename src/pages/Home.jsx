import React, { useState } from 'react'

function Home() {
  const [search, setSearch] = useState('')

  const handleSearch = () => {
    alert('Search for: ' + search)
  }

  return (
    <section className=" flex flex-col items-center">
      <div className="flex justify-center my-5 md:my-7">
       <img alt="Vehicle Validation" class="w-64 h-64" src="https://vehicle-validation-mocha.vercel.app/vv.png"></img>
      </div>

      <div className="w-full max-w-md md:max-w-2xl  p-4 md:p-6 rounded-xl shadow-sm">

        <div className="flex mt-[-40px] gap-2 items-center">
          <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Enter Vehicle Number" 
            className="px-3 py-3 rounded-lg border border-slate-300 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-slate-600"
          />
          <button 
            className="w-14 h-14 md:w-13 md:h-13 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-lg md:text-xl" 
            onClick={handleSearch} 
            aria-label="Search"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
export default Home;
