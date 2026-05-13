'use client';

import { JSX } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import Header_ui from './header_ui';

export function HeaderContainer(): JSX.Element {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return <Header_ui isAuthenticated={isAuthenticated} />;
}
