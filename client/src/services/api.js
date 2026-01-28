import axios from 'axios';

const api = axios.create({
    baseURL: '/api/items',
});

export const getItems = () => api.get('/');
export const createItem = (data) => api.post('/', data);
export const updateItem = (id, data) => api.put(`/${id}`, data);
export const deleteItem = (id) => api.delete(`/${id}`);

export default api;
