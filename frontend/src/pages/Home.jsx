import { useState } from 'react';
import { searchVehicles } from '../services/vehicleService';

function Home() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!search.trim()) {
      setError('Please enter a vehicle or pass number');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResults([]);
      
      const data = await searchVehicles(search);
      
      if (data.count > 0) {
        setResults(data.data); 
      } else {
        setError('No vehicle found with this number');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="flex flex-col items-center px-4">
      <div className="flex justify-center my-5 md:my-7 md:mt-0">
        <img 
          alt="Vehicle Validation" 
          className="w-64 h-64" 
          src="https://vehicle-validation-mocha.vercel.app/vv.png"
        />
      </div>

      <div className="w-full max-w-md md:max-w-2xl p-4 md:p-6 rounded-xl shadow-sm">
        <div className="flex mt-[-40px] ml-8 gap-2 items-center">
          <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter Vehicle or Pass Number" 
            className="px-3 py-3 rounded-lg border border-slate-300 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-slate-600 w-full"
            disabled={loading}
          />
          <button 
            className="w-14 h-14 md:w-13 md:h-13 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-lg md:text-xl disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={handleSearch}
            disabled={loading}
            aria-label="Search"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
            ) : (
              <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="w-full max-w-md md:max-w-2xl mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="w-full max-w-6xl mt-8 px-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Found {results.length} Vehicle{results.length > 1 ? 's' : ''} 
            </h2>
            <button
              onClick={() => {
                setResults([]);
                setSearch('');
                setError(null);
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm font-medium"
            >
              Clear Results
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <div key={result._id} className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Vehicle #{index + 1}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Valid
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Vehicle Number:</span>
                    <span className="text-blue-600 font-bold">{result.vehicleNumber}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Pass Number:</span>
                    <span className="text-red-600 font-bold">{result.passNumber}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Vehicle Type:</span>
                    <span className="text-gray-800 capitalize">{result.vehicleType}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Owner Name:</span>
                    <span className="text-gray-800">{result.ownerName}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Owner Contact:</span>
                    <span className="text-gray-800">{result.ownerContact}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Flat Number:</span>
                    <span className="text-red-600 font-bold">{result.flatNumber}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Flat Owner:</span>
                    <span className="text-gray-800">{result.flatOwnerName}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Valid Till:</span>
                    <span className="text-green-600 font-semibold">
                      {new Date(result.validTill).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between py-2">
                    <span className="font-semibold text-gray-700">RC/DL Number:</span>
                    <span className="text-blue-600">{result.rcDlNumber}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Home;
