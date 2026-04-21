'use client';

import { JSX } from 'react';
import { ChangePasswordUi } from './change-password-ui';
import {
	ChangePasswordLogicReturn,
	useChangePasswordLogic,
} from '@/hooks/users/profile/use-change-password-logic';

export default function ChangePasswordContainer(): JSX.Element {
	const logic: ChangePasswordLogicReturn = useChangePasswordLogic();

	return <ChangePasswordUi {...logic} />;
}
