'use client';

import { useShopProfileLogic } from '@/hooks/shops/admin/use-shop-profile-logic';
import { useShopProfile, useUpdateShopProfile } from '@/queries/shops/admin/use-shop-profile-query';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { ShopProfile } from '@/types/shops/admin/ShopProfile';
import { UseMutationResult } from '@tanstack/react-query';
import ShopProfileFormUi from './shop-profile-form-ui';

interface ShopProfileContainerProps {
	initialData: ShopProfile;
	formType: AdminFormType;
	userId: string;
}

export default function ShopProfileFormContainer({
	initialData,
	formType,
	userId,
}: ShopProfileContainerProps) {
	// 1. Kết nối TanStack Query
	const { data: storeData } = useShopProfile(userId, initialData);
	const updateMutation: UseMutationResult<ShopProfile, Error, ShopProfile> =
		useUpdateShopProfile();

	// 2. Kết nối Logic Hook
	const logic = useShopProfileLogic({
		initialData: storeData || initialData,
		formType,
		onMutate: async (formData: ShopProfile): Promise<void> => {
			await updateMutation.mutateAsync(formData);
		},
	});

	return <ShopProfileFormUi {...logic} />;
}
