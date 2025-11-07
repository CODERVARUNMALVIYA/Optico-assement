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


export const createVehicle = async (vehicleData) => {
    const response = await client.post('/vehicles', vehicleData);
    return response.data;
};

export const updateVehicle = async (id, vehicleData) => {
    const response = await client.put(`/vehicles/${id}`, vehicleData);
    return response.data;
};

export const deleteVehicle = async (id) => {
    const response = await client.delete(`/vehicles/${id}`);
    return response.data;
};
