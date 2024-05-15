import axios from 'axios';

const ApiClient = axios.create({
    baseURL: 'https://localhost:7021/api',
    headers: {
        'Accept': 'application/json',
    },
});

export const getTasksByDate = (date) => ApiClient.get(`/Tasks`, { params: { date } });
export const toggleTaskCompletion = (taskId) => ApiClient.patch(`/Tasks/${taskId}/toggle`);
export const createTask = (task) => ApiClient.post(`/Tasks`,task);
export const getTaskById = (taskId) => ApiClient.get(`/Tasks/${taskId}`);
export const editTask = (taskId,task) => ApiClient.put(`/Tasks/${taskId}`,task);
export const deleteTask = (taskId) => ApiClient.delete(`/Tasks/${taskId}`);

