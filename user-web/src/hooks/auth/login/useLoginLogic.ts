import { authService, LoginPayload, LoginResponse } from "@/services/auth/authService";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export function useLoginLogic() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState<LoginPayload>({ email: '', password: '' });

  // Định nghĩa Mutation: Quản lý vòng đời của request Login
  const loginMutation = useMutation({
    // 1. Hàm thực thi chính
    mutationFn: ({ email, password }: LoginPayload): Promise<LoginResponse> => authService.login({ email, password }),

    // 2. Khi bắt đầu gửi request (thay cho setIsLoading(true))
    onMutate: () => {
      console.log("Đang bắt đầu đăng nhập..." + formData.email + " - " + formData.password);
    },

    // 3. Khi thành công
    onSuccess: (data: LoginResponse) => {
      // Cập nhật Zustand Store
      login(data.user);
      // Điều hướng người dùng
      router.push('/');
    },

    // 4. Khi thất bại (Thay cho try-catch)
    onError: (error: AxiosError<{ message: string }>) => {
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
    if (!formData.email || !formData.password) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    // Kích hoạt mutation
    loginMutation.mutate({
      email: formData.email,
      password: formData.password
    });
  };

  return {
    loginWithGoogle: authService.loginWithGoogle,
    formData: formData,
    setFormData,
    handleSubmit,
    // Lấy trạng thái trực tiếp từ TanStack Query
    isLoading: loginMutation.isPending,
    isAuthenticated: useAuthStore((s) => s.isAuthenticated)
  };

}
