'use client';

import {
    useShopRegistrationLogic
} from '@/hooks/shops/user/use-shop-registration-logic';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { ShopRegistrationForm } from '@/types/shops/user/ShopRegistrationForm';
import { JSX } from 'react';
import ShopRegistrationUi from './shop-registration-ui';

export interface ShopRegistrationContainerProps {
	formType?: AdminFormType;
	initialData?: ShopRegistrationForm;
}

export default function ShopRegistrationContainer({
	formType = 'create',
	initialData,
}: ShopRegistrationContainerProps): JSX.Element {
    const logic = useShopRegistrationLogic({ initialData });
    

	return (
		<ShopRegistrationUi
			{...logic}
			formType={formType}
		/>
	);
}
