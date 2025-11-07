import client from '../api/client';

export const login = async (mobile, password, role) => {
    const response = await client.post('/users/login', { 
        mobile, 
        password, 
        role 
    });
    
    if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Trigger custom event to notify components
        window.dispatchEvent(new Event('userLogin'));
    }
    
    return response.data;
};

export const register = async (userData) => {
    const response = await client.post('/users/register', userData);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Trigger custom event to notify components
    window.dispatchEvent(new Event('storage'));
    
    window.location.href = '/login';
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};


