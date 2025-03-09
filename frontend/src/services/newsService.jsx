import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api/news";

const reportNews = async (url) => {
    const response = await axios.post(`${API_URL}/report`, { url });
    return response.data;
};

const analyzeNews = async (url) => {
    const response = await axios.post(`${API_URL}/analyze`, { url });
    return response.data;
};

export default { reportNews, analyzeNews };
