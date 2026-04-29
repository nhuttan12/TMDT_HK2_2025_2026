'use client';

import { AuthGuardProps, useAuthHandlerLogic } from '@/hooks/auth/guard/useGuardHandler';
import { AuthHandlerUi } from './AuthHandlerUi';
import Loading from '@/app/loading';
import { useStoreHydration } from '@/hooks/auth/guard/useStoreHydration';
import React from 'react';

export function AuthGuardContainer({
	children,
	fallbackPath = '/login',
}: AuthGuardProps): React.JSX.Element {
	const { isAuthorized } = useAuthHandlerLogic(fallbackPath);
	const isHydrated = useStoreHydration();

	// Nếu chưa xác thực xong, hiển thị UI loading (tương đương CanActivate trả về false/pending)
	if (!isAuthorized) {
		return <AuthHandlerUi />;
	}

	if (!isHydrated) return <Loading />; // Chờ persist load xong dữ liệu cũ
	// Nếu hợp lệ, cho phép render nội dung bên trong
	return <>{children}</>;
}
