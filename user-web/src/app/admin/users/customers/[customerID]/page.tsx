import { JSX } from 'react';
import UserAdminForm from '@/components/user/admin/user-admin-form';

export default function Index(): JSX.Element {
	return <UserAdminForm formType={'view'} />;
}
