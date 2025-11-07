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
    }
    
    return response.data;
};


