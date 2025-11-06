import React, { useState, useEffect } from 'react'

function Display() {
  const [records, setRecords] = useState([
    {
      id: 1,
      vehicleNumber: 'UP85EB3435',
      passNumber: 'T-25FD0001',
      rcDlNumber: 'FBD00000',
      ownerName: 'Vansh',
      ownerContact: '7888889999',
      address: 'Mathura',
      flatNumber: 'F25D',
      flatOwnerName: 'Vijay',
      validTill: '29/7/2026'
    },
    {
      id: 2,
      vehicleNumber: 'UP85EB3436',
      passNumber: 'O-S45D001',
      rcDlNumber: 'Fhsyehueueb666',
      ownerName: 'Ajay',
      ownerContact: '8552566666',
      address: 'FBF',
      flatNumber: 'S40D',
      flatOwnerName: 'Ram Singh',
      validTill: '28/3/2026'
    },
    {
      id: 3,
      vehicleNumber: 'MP85EB3435',
      passNumber: 'T-34GD005',
      rcDlNumber: 'Ghs6777hh',
      ownerName: 'Jaya',
      ownerContact: '8552566666',
      address: 'Bhind',
      flatNumber: 'G34D',
      flatOwnerName: 'Bhardwaj',
      validTill: '24/4/2026'
    },
    {
      id: 4,
      vehicleNumber: 'UP85EB3435',
      passNumber: 'T-25FD0001',
      rcDlNumber: 'FBD00000',
      ownerName: 'Vansh',
      ownerContact: '7888889999',
      address: 'Mathura',
      flatNumber: 'F25D',
      flatOwnerName: 'Vijay',
      validTill: '29/7/2026'
    },
  ])

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Vehicle Records</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((record) => (
          <div 
            key={record.id} 
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Record #{record.id}
            </h2>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Vehicle Number: </span>
                <span className="text-blue-600">{record.vehicleNumber}</span>
              </div>
              
              <div>
                <span className="font-semibold text-gray-700">Pass Number: </span>
                <span className="text-red-600">{record.passNumber}</span>
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
                <span className="font-semibold text-gray-700">Address: </span>
                <span className="text-gray-600">{record.address}</span>
              </div>
              
              <div>
                <span className="font-semibold text-gray-700">Flat Number: </span>
                <span className="text-red-600">{record.flatNumber}</span>
              </div>
              
              <div>
                <span className="font-semibold text-gray-700">Flat Owner Name: </span>
                <span className="text-gray-600">{record.flatOwnerName}</span>
              </div>
              
              <div>
                <span className="font-semibold text-gray-700">Valid Till: </span>
                <span className="text-gray-600">{record.validTill}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {records.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No vehicle records found.</p>
        </div>
      )}
    </section>
  )
}

export default Display;