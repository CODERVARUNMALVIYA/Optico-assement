import React, { useState } from 'react'

function Add() {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    passNumber: '',
    vehicleType: '',
    ownerName: '',
    flatNo: '',
    dlRcNumber: '',
    ownerContact: '',
    alternateContact: '',
    email: '',
    permanentAddress: '',
    flatOwnerName: '',
    flatOwnerContact: '',
    date: ''
  })

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Adding vehicle: ' + JSON.stringify(formData, null, 2))
  }

  return (
    <section className=" w-full max-w-lg md:max-w-xl lg:max-w-1xl">
      <h1 className='text-center text-2xl font-bold '>Add vehicle</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        
         <div>
          <label className="block">
            <span className="text-red-500 text-sm">*</span>
            <input 
              type="text"
              placeholder="Vehicle Number"
              value={formData.vehicleNumber} 
              onChange={(e) => handleChange('vehicleNumber', e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
            />
          </label>
        </div>

        <div>
          <label className="block">
            <span className="text-red-500 text-sm">*</span>
            <input 
              type="text"
              placeholder="Pass Number"
              value={formData.passNumber} 
              onChange={(e) => handleChange('passNumber', e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
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
              required
            />
          </label>
        </div>

        
        <div>
          <label className="block">
            <span className="text-red-500 text-sm">*</span>
            <input 
              type="text"
              placeholder="Flat No."
              value={formData.flatNo}
              onChange={(e) => handleChange('flatNo', e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
            />
          </label>
        </div>

        <div>
          <label className="block">
            <span className="text-red-500 text-sm">*</span>
            <input 
              type="text"
              placeholder="DL / RC Number"
              value={formData.dlRcNumber}
              onChange={(e) => handleChange('dlRcNumber', e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
            />
          </label>
        </div>

        
        <div>
          <label className="block">
            <span className="text-red-500 text-sm">*</span>
            <input 
              type="tel"
              placeholder="Vehicle Owner Contact"
              value={formData.ownerContact}
              onChange={(e) => handleChange('ownerContact', e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              required
            />
          </label>
        </div>

     
        <div>
          <label className="block">
            <input 
              type="tel"
              placeholder="Alternate Contact"
              value={formData.alternateContact}
              onChange={(e) => handleChange('alternateContact', e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </label>
        </div>

       
        <div>
          <label className="block">
            <input 
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
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
              required
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
              required
            />
          </label>
        </div>

    
        <div>
          <label className="block">
            <input 
              type="tel"
              placeholder="Flat Owner Contact"
              value={formData.flatOwnerContact}
              onChange={(e) => handleChange('flatOwnerContact', e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </label>
        </div>

        <div>
        <label className="block">
             <span className="text-red-500 text-sm">*</span>
            <input
               type="date"
               value={formData.date}
               onChange={(e) => handleChange("date", e.target.value)}
               className="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white appearance-none"
               required
  />
      </label>
        </div>
        <div className="pt-2">
          <button 
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Vehicle
          </button>
        </div>

      </form>
    </section>
  )
}
export default Add;