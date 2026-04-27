"use client";

import { AuthGuardProps, useAuthHandlerLogic } from "@/hooks/auth/guard/useGuardHandler";
import { AuthHandlerUi } from "./AuthHandlerUi";


export function AuthGuardContainer({ 
  children, 
  fallbackPath = "/auth/login" 
}: AuthGuardProps): React.JSX.Element {
  const { isAuthorized } = useAuthHandlerLogic(fallbackPath);

  // Nếu chưa xác thực xong, hiển thị UI loading (tương đương CanActivate trả về false/pending)
  if (!isAuthorized) {
    return <AuthHandlerUi />;
  }

  // Nếu hợp lệ, cho phép render nội dung bên trong
  return <>{children}</>;
}