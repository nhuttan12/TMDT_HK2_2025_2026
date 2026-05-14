'use client';

import { JSX } from 'react';
import { ProfileUi } from './profile-ui';
import { UserProfileInfo } from '@/types/users/user/UserProfileInfo';
import { useProfileQuery } from '@/queries/users/user/use-profile-query';
import { ProfileLogicReturn, useProfileLogic } from '@/hooks/users/profile/use-profile-logic';

interface ProfileContainerProps {
	userId: number;
	initialProfile: UserProfileInfo;
}

export default function ProfileContainer(props: ProfileContainerProps): JSX.Element {
	const { userId, initialProfile } = props;

	// 1. Quản lý trạng thái Server Data bằng TanStack Query
	const { data: profile, isLoading } = useProfileQuery(userId, initialProfile);

	// 2. Quản lý Local State (Form) bằng Logic Hook
	const logic: ProfileLogicReturn = useProfileLogic(profile);

	// 3. Render UI
	return (
		<ProfileUi
			{...logic}
			isLoading={isLoading}
		/>
	);
}
