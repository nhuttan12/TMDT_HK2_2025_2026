import axios from 'axios';

const apiClient = axios.create({
	baseURL: '/api', // Gọi vào Next.js Route Handlers
	timeout: 5000,
	withCredentials: true, // Quan trọng để gửi kèm HttpOnly Cookie
});

export default apiClient;
