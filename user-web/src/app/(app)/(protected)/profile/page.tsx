import { JSX } from 'react';
import ProfileContainer from './_components/profile-container';
import { UserProfileInfo } from '@/types/users/user/UserProfileInfo';
import { getUserProfile } from '@/services/users/user/profile-service';

export default async function ProfilePage(): Promise<JSX.Element> {
	// TODO: Lấy userId từ Session/Token.
	const userId: number = 1;

	// Gọi API từ phía Server (RSC)
	const initialProfile: UserProfileInfo = await getUserProfile(userId);

	return (
		<ProfileContainer
			userId={userId}
			initialProfile={initialProfile}
		/>
	);
}
