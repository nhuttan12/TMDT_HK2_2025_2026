import { AuthGuardContainer } from '@/components/auth/auth-guard-container';
import React from 'react';

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps): React.JSX.Element {
	// Bọc toàn bộ các trang con trong group này bằng AuthGuardContainer
	// Bạn có thể truyền fallbackPath khác nếu muốn
	return <AuthGuardContainer fallbackPath='/'>{children}</AuthGuardContainer>;
}
