'use client';

import { AuthGuardProps, useAuthHandlerLogic } from '../../hooks/auth/guard/use-guard-handler';
import Loading from '@/app/loading';
// import { useHydration } from '../../hooks/auth/guard/use-hydration';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { AuthHandlerUi } from '@/components/auth/AuthHandlerUi';

let isGlobalHydrated = false;

export function AuthGuardContainer({
	children,
	fallbackPath = '/login',
}: AuthGuardProps): React.JSX.Element {
	const isAuthorized = useAuthStore((s) => s.isAuthenticated);
	const _hasHydrated = useAuthStore((s) => s._hasHydrated);

	// Local state để trigger render lần đầu ở Client
	const [ready, setReady] = useState(isGlobalHydrated);

	useEffect(() => {
		if (_hasHydrated) {
			isGlobalHydrated = true;
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setReady(true);
		}
	}, [_hasHydrated]);

	// 1. Nếu chưa hydrate lần đầu (F5 trang): Hiện Loading
	if (!ready) {
		return <Loading />;
	}

	// 2. Nếu đã hydrate nhưng không có quyền: Trả về UI báo lỗi/Login
	if (!isAuthorized) {
		return <AuthHandlerUi />;
	}

	// 3. Nếu mọi thứ ổn: Render nội dung ngay lập tức
	return <>{children}</>;
}
