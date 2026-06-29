import axios from "axios"

const API_URL = import.meta.env.REACT_BACKEND_URL || "https://improved-telegram-g99qjrgjq4wcpp96-56067.app.github.dev"


export const createLeave = (data) => {
    return axios.post(`${API_URL}/api/Create/Leave`, data);
};

export const getAllLeave = (data = {}) => {
    return axios.post(`${API_URL}/api/GetAll/Leave`, data);
};

export const getLeave = (data) => {
    return axios.post(`${API_URL}/api/Get/Leave`, data);
};

export const updateLeave = (data) => {
    return axios.post(`${API_URL}/api/Update/Leave`, data);
};

export const approveLeave = (data) => {
    return axios.post(`${API_URL}/api/Approve/Leave`, data);
};

export const deleteLeave = (data) => {
    return axios.post(`${API_URL}/api/Delete/Leave`, data);
};