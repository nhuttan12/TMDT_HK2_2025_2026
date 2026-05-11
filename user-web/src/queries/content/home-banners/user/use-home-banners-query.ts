import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getHomeBanners } from '@/services/contents/home-banners/user/home-banners-service';
import { HomeBanner } from '@/types/contents/home-banners/HomeBanner';

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
