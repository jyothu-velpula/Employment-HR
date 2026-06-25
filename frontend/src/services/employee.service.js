import axios from "axios"

const API_URL = import.meta.env.REACT_BACKEND_URL || "https://improved-telegram-g99qjrgjq4wcpp96-56067.app.github.dev"

export const getEmployees = (id) => {
    return axios.post(`${API_URL}/api/get/Employee`,id)
}

export const getAllEmployees = () => {
    return axios.post(`${API_URL}/api/get/All/Employee`)
}

export const createEmployees = (data) => {
    return axios.post(`${API_URL}/api/create/Employee`,data)
}

export const updateEmployees = (data) => {
    return axios.post(`${API_URL}/api/update/Employee`,data)
}

export const deleteEmployees = (id) => {
    return axios.post(`${API_URL}/api/delete/Employee`,id)
}