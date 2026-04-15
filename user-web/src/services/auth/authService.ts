import apiClient from "@/lib/axios";

export const authService = {
        
   login: async (Username: string, password: string) => {
        const response = await apiClient.post("/Auth/login", { Username, password });
        if(response.status !== 200){
            throw new Error('Login failed');
        }
        console.log('Login successful:', response);
        return response; 
    },
    loginWithGoogle: () => {
        // alert('oke')
        window.location.assign('/api/auth/google');
    }
}
