import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { HomeBanner } from '@/types/uis/HomeBanner';
import { getHomeBanners } from '@/services/contents/home-banners/user/home-banners-service';

export function useHomeBannersQuery(
	initialData?: HomeBanner[],
): UseQueryResult<HomeBanner[], Error> {
	return useQuery({
		queryKey: ['home-banners'],
		queryFn: (): Promise<HomeBanner[]> => getHomeBanners(),
		initialData: initialData,
		staleTime: 1000 * 60 * 10, // Cache 10 phút
	});
}
