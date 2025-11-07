import React, { useState } from 'react'
import { createVehicle } from '../services/vehicleService'
import { useNavigate } from 'react-router-dom'

function Add() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    passNumber: '',
    vehicleType: '',
    ownerName: '',
    flatNumber: '',
    rcDlNumber: '',
    ownerContact: '',
    alternateContact: '',
    email: '',
    permanentAddress: '',
    flatOwnerName: '',
    flatOwnerContact: '',
    validTill: ''
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      setError(null)
      
      await createVehicle(formData)
      
      setSuccess(true)
      
      setFormData({
        vehicleNumber: '',
        passNumber: '',
        vehicleType: '',
        ownerName: '',
        flatNumber: '',
        rcDlNumber: '',
        ownerContact: '',
        alternateContact: '',
        email: '',
        permanentAddress: '',
        flatOwnerName: '',
        flatOwnerContact: '',
        validTill: ''
      })
      
      setTimeout(() => {
        navigate('/display')
      }, 2000)
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add vehicle. Please try again.')
      console.error('Error adding vehicle:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className=" w-full max-w-lg md:max-w-xl lg:max-w-1xl">
      <h1 className='text-center text-2xl font-bold '>Add vehicle</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          Vehicle added successfully! Redirecting to display page...
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        
         <div>
          <label className="block">
            <span className="text-red-500 text-sm">*</span>
            <input 
              type="text"
              placeholder="Vehicle Number (e.g., MH 12 LP 3162)"
              value={formData.vehicleNumber} 
              onChange={(e) => handleChange('vehicleNumber', e.target.value.toUpperCase())}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              pattern="[A-Z]{2}\s?\d{2}\s?[A-Z]{1,2}\s?\d{4}"
              title="Format: MH 12 LP 3162 or MH12LP3162"
              maxLength="15"
              required
              disabled={loading}
            />
          </label>
        </div>

        <div>
          <label className="block">
            <span className="text-red-500 text-sm">*</span>
            <input 
              type="text"
              placeholder="Pass Number (e.g., T-25FC600)"
              value={formData.passNumber} 
              onChange={(e) => handleChange('passNumber', e.target.value.toUpperCase())}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              pattern="[A-Z]{1,2}-?[A-Z0-9]{4,10}"
              title="Format: T-25FC600 or O-S45D001"
              maxLength="15"
              required
              disabled={loading}
            />
          </label>
        </div>

        <div>
          <label className="block">
            <span className="text-red-500 text-sm">*</span>
            <select
              value={formData.vehicleType}
              onChange={(e) => handleChange('vehicleType', e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-400 appearance-none bg-white"
              style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em'}}
              required
              disabled={loading}
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="scooter">Scooter</option>
              <option value="van">Van</option>
            </select>
          </label>
        </div>

       
        <div>
          <label className="block">
            <span className="text-red-500 text-sm">*</span>
            <input 
              type="text"
              placeholder="Vehicle Owner Name"
              value={formData.ownerName}
              onChange={(e) => handleChange('ownerName', e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              pattern="[A-Za-z\s]+"
              title="Only letters and spaces allowed"
              minLength="2"
              maxLength="50"
              required
              disabled={loading}
            />
          </label>
        </div>

        
        <div>
          <label className="block">
            <span className="text-red-500 text-sm">*</span>
            <input 
              type="text"
              placeholder="Flat No. (e.g., A-101, F25D)"
              value={formData.flatNumber}
              onChange={(e) => handleChange('flatNumber', e.target.value.toUpperCase())}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              maxLength="10"
              required
              disabled={loading}
            />
          </label>
        </div>

        <div>
          <label className="block">
            <span className="text-red-500 text-sm">*</span>
            <input 
              type="text"
              placeholder="DL / RC Number"
              value={formData.rcDlNumber}
              onChange={(e) => handleChange('rcDlNumber', e.target.value.toUpperCase())}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              minLength="5"
              maxLength="20"
              required
              disabled={loading}
            />
          </label>
        </div>

        
        <div>
          <label className="block">
            <span className="text-red-500 text-sm">*</span>
            <input 
              type="tel"
              placeholder="Vehicle Owner Contact (10 digits)"
              value={formData.ownerContact}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) handleChange('ownerContact', value);
              }}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              pattern="\d{10}"
              title="Enter valid 10 digit mobile number"
              minLength="10"
              maxLength="10"
              required
              disabled={loading}
            />
          </label>
        </div>

     
        <div>
          <label className="block">
            <span className="text-gray-500 text-xs">Optional</span>
            <input 
              type="tel"
              placeholder="Alternate Contact (10 digits, Optional)"
              value={formData.alternateContact}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) handleChange('alternateContact', value);
              }}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              pattern="\d{10}"
              title="Enter valid 10 digit mobile number"
              minLength="10"
              maxLength="10"
              disabled={loading}
            />
          </label>
        </div>

       
        <div>
          <label className="block">
            <span className="text-gray-500 text-xs">Optional</span>
            <input 
              type="email"
              placeholder="Email (Optional)"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              disabled={loading}
            />
          </label>
        </div>

        <div>
          <label className="block">
            <span className="text-red-500 text-sm">*</span>
            <input 
              type="text"
              placeholder="Permanent Address"
              value={formData.permanentAddress}
              onChange={(e) => handleChange('permanentAddress', e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              minLength="10"
              maxLength="200"
              required
              disabled={loading}
            />
          </label>
        </div>

    
        <div>
          <label className="block">
            <span className="text-red-500 text-sm">*</span>
            <input 
              type="text"
              placeholder="Flat Owner Name"
              value={formData.flatOwnerName}
              onChange={(e) => handleChange('flatOwnerName', e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              pattern="[A-Za-z\s]+"
              title="Only letters and spaces allowed"
              minLength="2"
              maxLength="50"
              required
              disabled={loading}
            />
          </label>
        </div>

    
        <div>
          <label className="block">
            <span className="text-gray-500 text-xs">Optional</span>
            <input 
              type="tel"
              placeholder="Flat Owner Contact (10 digits, Optional)"
              value={formData.flatOwnerContact}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) handleChange('flatOwnerContact', value);
              }}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              pattern="\d{10}"
              title="Enter valid 10 digit mobile number"
              minLength="10"
              maxLength="10"
              disabled={loading}
            />
          </label>
        </div>

        <div>
        <label className="block">
             <span className="text-red-500 text-sm">*</span>
            <input
               type="date"
               value={formData.validTill}
               onChange={(e) => handleChange("validTill", e.target.value)}
               className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white appearance-none"
               required
               disabled={loading}
  />
      </label>
        </div>
        <div className="pt-2">
          <button 
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Adding Vehicle...
              </>
            ) : (
              'Add Vehicle'
            )}
          </button>
        </div>

      </form>
    </section>
  )
}
export default Add;