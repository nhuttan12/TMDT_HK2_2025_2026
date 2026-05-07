'use client';

import React, { JSX } from 'react';
import { useShopProfileLogic } from '@/hooks/shops/admin/use-shop-profile-logic';
import ShopProfileFormUi from '@/app/admin/shop-info/_components/shop-profile-form-ui';
import { ShopProfile } from '@/types/shops/admin/ShopProfile';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { useShopProfile, useUpdateShopProfile } from '@/queries/shops/admin/use-shop-profile-query';
import { UseMutationResult } from '@tanstack/react-query';

interface ShopProfileContainerProps {
	initialData: ShopProfile;
	formType: AdminFormType;
}

export default function ShopProfileFormContainer({
	initialData,
	formType,
}: ShopProfileContainerProps): JSX.Element {
	// 1. Kết nối TanStack Query
	const { data: storeData } = useShopProfile(initialData);
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
