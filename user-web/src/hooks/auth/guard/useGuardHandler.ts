import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import {authService} from "@/services/auth/authService";

export interface AuthGuardProps {
  children: React.ReactNode;
  fallbackPath?: string;
}
export interface UseAuthGuardReturn {
  isAuthorized: boolean;
}

export function useAuthHandlerLogic(fallbackPath: string = "/login"): UseAuthGuardReturn {
  const checkMe = authService.checkMe();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useEffect((): void => {
    const handleAuth = async (): Promise<void> => {
      if (!isAuthenticated) {
      // TODO: thực hiện call BE để lấy thông tin
          checkMe;
         router.push(fallbackPath);
      }
    };

    handleAuth();
  }, [ isAuthenticated, router,checkMe, fallbackPath]);

  return { isAuthorized: isAuthenticated };
}