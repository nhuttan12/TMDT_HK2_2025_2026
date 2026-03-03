import { JSX } from 'react';
import UserAdminForm from '@/components/user/admin/user-admin-form';

export default function AddNewProductPage(): JSX.Element {
	return <UserAdminForm formType='create' />;
}
