import React, { useState, useEffect } from 'react'
import { getAllVehicles, deleteVehicle, updateVehicle } from '../services/vehicleService'
import { useNavigate } from 'react-router-dom'

function Update() {
  const navigate = useNavigate()
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [editingRecord, setEditingRecord] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [updateLoading, setUpdateLoading] = useState(false)

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

  const handleEdit = (record) => {
    setEditingRecord(record)
    setEditForm({
      vehicleNumber: record.vehicleNumber,
      passNumber: record.passNumber,
      vehicleType: record.vehicleType,
      ownerName: record.ownerName,
      flatNumber: record.flatNumber,
      rcDlNumber: record.rcDlNumber,
      ownerContact: record.ownerContact,
      alternateContact: record.alternateContact || '',
      email: record.email || '',
      permanentAddress: record.permanentAddress,
      flatOwnerName: record.flatOwnerName,
      flatOwnerContact: record.flatOwnerContact || '',
      validTill: record.validTill.split('T')[0] 
    })
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    try {
      setUpdateLoading(true)
      const response = await updateVehicle(editingRecord._id, editForm)
      
      setRecords(records.map(record => 
        record._id === editingRecord._id ? response.data : record
      ))
      
      alert('Vehicle updated successfully!')
      setEditingRecord(null)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update vehicle')
      console.error('Error updating vehicle:', err)
    } finally {
      setUpdateLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingRecord(null)
    setEditForm({})
  }

  const handleDelete = async (recordId, vehicleNumber) => {
    if (window.confirm(`Are you sure you want to delete vehicle ${vehicleNumber}?`)) {
      try {
        setDeleteLoading(recordId)
        await deleteVehicle(recordId)
        
        setRecords(records.filter(record => record._id !== recordId))
        
        alert(`Vehicle ${vehicleNumber} deleted successfully`)
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete vehicle')
        console.error('Error deleting vehicle:', err)
      } finally {
        setDeleteLoading(null)
      }
    }
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">Update Vehicle Records</h1>

      {editingRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Edit Vehicle</h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                disabled={updateLoading}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={editForm.vehicleNumber}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                    required
                    pattern="[A-Z]{2}\s?\d{2}\s?[A-Z]{1,2}\s?\d{4}"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pass Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="passNumber"
                    value={editForm.passNumber}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="vehicleType"
                    value={editForm.vehicleType}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="car">bike</option>
                    <option value="car">Car</option>
                    <option value="van">Van</option>
                    <option value="scooter">Scooter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={editForm.ownerName}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    pattern="[A-Za-z\s]+"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Flat Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="flatNumber"
                    value={editForm.flatNumber}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    RC/DL Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="rcDlNumber"
                    value={editForm.rcDlNumber}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner Contact <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="ownerContact"
                    value={editForm.ownerContact}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    pattern="[0-9]{10}"
                    maxLength="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alternate Contact
                  </label>
                  <input
                    type="tel"
                    name="alternateContact"
                    value={editForm.alternateContact}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    pattern="[0-9]{10}"
                    maxLength="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Flat Owner Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="flatOwnerName"
                    value={editForm.flatOwnerName}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    pattern="[A-Za-z\s]+"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Flat Owner Contact
                  </label>
                  <input
                    type="tel"
                    name="flatOwnerContact"
                    value={editForm.flatOwnerContact}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    pattern="[0-9]{10}"
                    maxLength="10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid Till <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="validTill"
                    value={editForm.validTill}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Permanent Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="permanentAddress"
                  value={editForm.permanentAddress}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={updateLoading}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {updateLoading ? 'Updating...' : 'Update Vehicle'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={updateLoading}
                  className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
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
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow relative"
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => handleEdit(record)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  title="Edit"
                  disabled={deleteLoading === record._id}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(record._id, record.vehicleNumber)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                  title="Delete"
                  disabled={deleteLoading === record._id}
                >
                  {deleteLoading === record._id ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>

              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {record.vehicleNumber}
              </h2>
              
              <div className="space-y-2 text-sm mb-4">
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

export default Update;