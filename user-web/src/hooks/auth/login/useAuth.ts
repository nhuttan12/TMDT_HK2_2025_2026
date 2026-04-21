import { authService } from "@/services/auth/authService";
import { useAuthStore } from "@/stores/auth.store";
import { useState } from "react";

export function useAuth() {
  const loginWithGoogle = () => {
    authService.loginWithGoogle();
  }

  const [isLoading, setIsLoading] = useState(false);
  const login = (username: string, password: string) => authService.login(username, password);
  const loginStore = useAuthStore((state) => state.login);
  const [formdata, setFormData] = useState({
    username: '',
    password: ''
  });

  const { isAuthenticated } = useAuthStore();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formdata.username || !formdata.password) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    setIsLoading(true);
    try {
      await login(formdata.username, formdata.password);
      await loginStore();
    } catch (error) {
      console.error('Login failed:', error);
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsLoading(false);
    }
  };


  return {
    loginWithGoogle,
    login,
    formdata,
    setFormData,
    handleSubmit,
    isLoading,
    setIsLoading,
    isAuthenticated
  };
}