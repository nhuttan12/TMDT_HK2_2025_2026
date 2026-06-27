import { JSX } from 'react';
import ProfileContainer from './_components/profile-container';
import { UserProfileInfo } from '@/types/users/user/UserProfileInfo';
import { getUserProfileCraw, UserService } from '@/services/users/user/profile-service';
import apiServer from '@/lib/api-server';

export default async function ProfilePage(): Promise<JSX.Element> {
	// TODO: Lấy userId từ Session/Token.
	const userId: number = 1;
	const userService = new UserService(apiServer);
	// Gọi API từ phía Server (RSC)
	const initialProfile: UserProfileInfo = await userService.getUserProfile(userId);

	return (
		<ProfileContainer
			userId={userId}
			initialProfile={initialProfile}
		/>
	);
}
