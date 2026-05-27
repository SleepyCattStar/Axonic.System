import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const fetchSystemStats = async () => {

    const response = await axios.get(
        `${BASE_URL}/system-stats`
    );

    return response.data;
};

export const fetchProcesses = async () => {

    const response = await axios.get(
        `${BASE_URL}/processes`
    );

    return response.data;
};

export const killProcess = async (pid) => {

    await axios.delete(
        `${BASE_URL}/kill-process/${pid}`
    );
};