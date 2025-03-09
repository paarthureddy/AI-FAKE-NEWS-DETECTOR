import axios from "axios";

const API_URL = "http://localhost:5000/api/users/";

export const registerUser = async (userData) => {
    return await axios.post(API_URL + "register", userData);
};

export const loginUser = async (userData) => {
    const response = await axios.post(API_URL + "login", userData);
    if (response.data.token) localStorage.setItem("token", response.data.token);
    return response.data;
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};

export const getToken = () => {
    return localStorage.getItem("token");
};
