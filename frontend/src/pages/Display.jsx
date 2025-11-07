import React, { useState, useEffect } from 'react'
import { getAllVehicles } from '../services/vehicleService'

function Display() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllVehicles()
      setRecords(data.data || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch vehicles')
      console.error('Error fetching vehicles:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Vehicle Records</h1>
      
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700"></div>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-6">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((record) => (
            <div 
              key={record._id} 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {record.vehicleNumber}
              </h2>
              
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Pass Number: </span>
                  <span className="text-red-600">{record.passNumber}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Vehicle Type: </span>
                  <span className="text-gray-600 capitalize">{record.vehicleType}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">RC/DL Number: </span>
                  <span className="text-blue-600">{record.rcDlNumber}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Owner Name: </span>
                  <span className="text-gray-600">{record.ownerName}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Owner Contact: </span>
                  <span className="text-gray-600">{record.ownerContact}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Flat Number: </span>
                  <span className="text-red-600">{record.flatNumber}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Flat Owner: </span>
                  <span className="text-gray-600">{record.flatOwnerName}</span>
                </div>
                
                <div>
                  <span className="font-semibold text-gray-700">Valid Till: </span>
                  <span className="text-green-600 font-semibold">
                    {new Date(record.validTill).toLocaleDateString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && records.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No vehicle records found.</p>
        </div>
      )}
    </section>
  )
}

export default Display;