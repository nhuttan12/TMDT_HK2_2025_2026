'use client';

import React from 'react';
import { useTokenLogic } from '@/hooks/auth/token/use-token-logic';
import GlobalLoading from '@/app/loading';

export interface AuthContainerProps {
	children: React.ReactNode;
}
function AuthContainer(AuthContainerProps: AuthContainerProps): React.ReactNode {
	const { isLoading } = useTokenLogic();
	if (isLoading) return <GlobalLoading />;
	return AuthContainerProps.children;
}

export default AuthContainer;
