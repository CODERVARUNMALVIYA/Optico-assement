import React, { useState, useEffect } from 'react'

function Update() {
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
      vehicleNumber: 'MP85EB3435',
      passNumber: 'T-34GD005',
      rcDlNumber: 'Ghs6777hh',
      ownerName: 'Jaya',
      ownerContact: '8552566666',
      address: 'Bhind',
      flatNumber: 'G34D',
      flatOwnerName: 'Bhardwaj',
      validTill: '24/4/2026'
    }
  ])

  const handleEdit = (record) => {
    alert(`Edit record #${record.id}\nVehicle: ${record.vehicleNumber}`)
  }

  const handleDelete = (recordId) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setRecords(records.filter(record => record.id !== recordId))
      alert(`Record #${recordId} deleted successfully`)
    }
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Update Vehicle Records</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((record) => (
          <div 
            key={record.id} 
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow relative"
          >
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => handleEdit(record)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(record.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Record #{record.id}
            </h2>
            
            <div className="space-y-2 text-sm mb-4">
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

export default Update;