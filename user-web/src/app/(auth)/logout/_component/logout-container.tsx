'use client';

import { JSX, useEffect } from 'react';
import { LogoutUI } from '@/app/(auth)/logout/_component/logout-ui';
import { useLogoutLogic } from '../../../../hooks/auth/logout/use-logout-logic';

export function LogoutContainer(): JSX.Element {
	const { executeLogout } = useLogoutLogic();

	useEffect(() => {
		// Chỉ chạy logic logout một lần duy nhất khi component mount
		executeLogout();
	}, [executeLogout]);
	return <LogoutUI />;
}