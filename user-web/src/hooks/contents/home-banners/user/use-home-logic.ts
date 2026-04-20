import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface HomeBannerLogicReturn {
	handleRedirectToProducts: () => void;
}

export function useHomeBannerLogic(): HomeBannerLogicReturn {
	const router: AppRouterInstance = useRouter();

	const handleRedirectToProducts = (): void => {
		router.push('/products');
	};

	return {
		handleRedirectToProducts,
	};
}
