import React, { useState } from 'react'

function Admin() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    role: 'Admin',
    designation: '',
    email: '',
    address: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('User created: ' + JSON.stringify(formData, null, 2))
  }

  return (
    <section className="w-full max-w-lg mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl text-center font-bold mb-6">Add New User</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">Full Name</span>
              <input 
                type="text"
                placeholder="Enter full name"
                value={formData.fullName} 
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
              />
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">Mobile Number</span>
              <input 
                type="tel"
                placeholder="Enter mobile number"
                value={formData.mobile} 
                onChange={(e) => handleChange('mobile', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
              />
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">Role</span>
              <select
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 appearance-none bg-white"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.5em 1.5em'
                }}
                required
              >
                <option value="Admin">Admin</option>
                <option value="Guard">Guard</option>
              </select>
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">Designation</span>
              <input 
                type="text"
                placeholder="Enter designation"
                value={formData.designation} 
                onChange={(e) => handleChange('designation', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                required
              />
            </label>
          </div>

       
          <div>
            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">Email (Optional)</span>
              <input 
                type="email"
                placeholder="Enter email"
                value={formData.email} 
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">Address</span>
              <textarea 
                placeholder="Enter address"
                value={formData.address} 
                onChange={(e) => handleChange('address', e.target.value)}
                rows="3"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 resize-none"
                required
              />
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-2 block">Password</span>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={formData.password} 
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </label>
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Admin;