'use client';

import { useAuthStore } from "@/stores/auth.store";
import { useSearchParams } from "next/navigation";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthHandlerPage() {
  const router = useRouter();
    const searchParams = useSearchParams();
    const checkAuth = useAuthStore((state) => state.authCheck);

    useEffect(() => {
        const handleAuth = async () => {
            // 1. Phân loại mục đích dựa trên Query Params
            const mode = searchParams.get('mode'); // 'login', 'refresh', 'verify'

            try {
                if (mode === 'login' || !mode) {
                    // Logic sau khi đăng nhập Google thành công
                    await checkAuth(); // Gọi API /me để cập nhật Zustand
                    router.push('/dashboard');
                } 
                else if (mode === 'refresh') {
                    // Logic xử lý refresh token (nếu cần trang riêng)
                    await checkAuth();
                    router.back(); // Quay lại trang trước đó
                }
            } catch (error) {
                console.error("Auth Error:", error);
                router.push('/auth/login?error=auth_failed');
            }
        };

        handleAuth();
    }, [searchParams, checkAuth, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Đang xử lý xác thực...</p>
        </div>
    );
}