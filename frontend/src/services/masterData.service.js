import axios from "axios"

const API_URL = import.meta.env.REACT_BACKEND_URL || "https://improved-telegram-g99qjrgjq4wcpp96-56067.app.github.dev"

export const createMasterData = (data)=> {
    return axios.post(`${API_URL}/api/create/MasterData`,data)
}

export const getAllMasterData = ()=> {
    return axios.post(`${API_URL}/api/getAll/MasterData`)
}

export const getCodeIdData = (data)=> {
    return axios.post(`${API_URL}/api/getAll/CodeIdData`,data)
}

export const updateMasterData = (data)=> {
    return axios.post(`${API_URL}/api/update/MasterData`,data)
}