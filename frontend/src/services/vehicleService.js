import client from '../api/client';

export const getAllVehicles = async () => {
    const response = await client.get('/vehicles');
    return response.data;
};

export const searchVehicles = async (query) => {
    const response = await client.get('/vehicles/search', {
        params: { query }
    });
    return response.data;
};


