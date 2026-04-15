// src/lib/axios.ts
import axios from 'axios';

const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL, // Lấy từ file .env
    baseURL: "https://localhost:7087/api",
    timeout: 5000,
});

export default apiClient;