'use client';

import { JSX } from 'react';
import ShopRegistrationUi from './shop-registration-ui';
import {
	useShopRegistrationLogic,
	UseShopRegistrationLogicReturn,
} from '@/hooks/shops/user/use-shop-registration-logic';

export default function ShopRegistrationContainer(): JSX.Element {
	const logic: UseShopRegistrationLogicReturn = useShopRegistrationLogic();

	return <ShopRegistrationUi {...logic} />;
}
