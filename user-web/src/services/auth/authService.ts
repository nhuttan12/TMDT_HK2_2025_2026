import apiClient from "@/lib/axios";

export const authService = {
        
   login: async (email: string, password: string) => {
    // Chỉ gửi request và trả về data. Lỗi sẽ được TanStack Query bắt ở lớp Hook.
    const response = await apiClient.post("/auth/login", { email, password });
    return response.data; 
  },
  
  loginWithGoogle: () => {
    window.location.assign('/api/auth/google');
  }
}
