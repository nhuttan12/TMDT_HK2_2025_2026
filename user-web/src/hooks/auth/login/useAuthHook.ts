import { authService } from "@/services/auth/authService";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

export function useAuthHook() {
  // const router = useRouter();
  const setAuthenticated = useAuthStore((state) => state.login);
  const [formdata, setFormData] = useState({ username: '', password: '' });

  // Định nghĩa Mutation: Quản lý vòng đời của request Login
  const loginMutation = useMutation({
    // 1. Hàm thực thi chính
    mutationFn: ({ u, p }: { u: string; p: string }) => authService.login(u, p),

    // 2. Khi bắt đầu gửi request (thay cho setIsLoading(true))
    onMutate: () => {
      console.log("Đang bắt đầu đăng nhập...");
    },

    // 3. Khi thành công
    onSuccess: (data) => {
      // Cập nhật Zustand Store
      setAuthenticated(data.user);
      // Điều hướng người dùng
      // router.push('/dashboard');
    },

    // 4. Khi thất bại (Thay cho try-catch)
    onError: (error: any) => {
      const errorMsg = error.response?.data?.message || "Đăng nhập thất bại";
      alert(errorMsg);

      setFormData((prev) => ({
        ...prev,
        password: '' 
      }));
    }
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formdata.username || !formdata.password) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    // Kích hoạt mutation
    loginMutation.mutate({
      u: formdata.username,
      p: formdata.password
    });
  };

  return {
    loginWithGoogle: authService.loginWithGoogle,
    formdata,
    setFormData,
    handleSubmit,
    // Lấy trạng thái trực tiếp từ TanStack Query
    isLoading: loginMutation.isPending,
    isAuthenticated: useAuthStore((s) => s.isAuthenticated)
  };

}