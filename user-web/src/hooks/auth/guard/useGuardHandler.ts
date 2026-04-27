import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export interface AuthGuardProps {
  children: React.ReactNode;
  fallbackPath?: string;
}
export interface UseAuthGuardReturn {
  isAuthorized: boolean;
}

export function useAuthHandlerLogic(fallbackPath: string = "/auth/login"): UseAuthGuardReturn {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect((): void => {
    const handleAuth = async (): Promise<void> => {
      if (!isAuthenticated) {
         //TODO: thực hiện refresh token ở đây nếu có refresh token, sau đó cập nhật lại trạng thái isAuthenticated
         // await authService.refreshToken();

        router.push(fallbackPath);
      }
    };

    handleAuth();
  }, [ isAuthenticated, router, fallbackPath]);

  return { isAuthorized: isAuthenticated };
}