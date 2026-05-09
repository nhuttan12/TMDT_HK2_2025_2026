import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';
import { logoutServerAction } from '@/app/(auth)/logout/_actions/logout.action';



export interface LogoutLogicReturn {
	executeLogout: () => Promise<void>;
}

export function useLogoutLogic(): LogoutLogicReturn {
	const router = useRouter();
	const logoutClient = useAuthStore((state) => state.logout);

	const executeLogout = useCallback(async (): Promise<void> => {
		try {
			await logoutServerAction();
			logoutClient();
			router.replace('/login');
			router.refresh();
		} catch (error) {
			console.error('Critical Logout Error:', error);
			logoutClient();
			router.replace('/login');
		}
	}, [logoutClient, router]);

	return { executeLogout };
}
