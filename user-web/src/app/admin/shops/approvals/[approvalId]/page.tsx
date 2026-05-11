import { JSX } from 'react';
import { Metadata } from 'next';
import ShopRegistrationContainer from '@/components/shops/shop-registration-container';
import { getShopRegistrationFormByApprovalId } from '@/services/shops/admin/shop-approval-service';

export const metadata: Metadata = {
	title: 'Phê duyệt đơn đăng ký cửa hàng',
	description: 'Trang phê duyệt các đơn xin cấp phép mở cửa hàng.',
};

interface ShopRegistrationPageProps {
	params: Promise<{ approvalId: string }>;
}

export default async function ShopRegistrationPage({
	params,
}: ShopRegistrationPageProps): Promise<JSX.Element> {
	const resolvedParams = await params;

    const approvalId = Number(resolvedParams.approvalId);

    const shopRegistrationForm = await getShopRegistrationFormByApprovalId(approvalId);

	return (
		<ShopRegistrationContainer
			formType='view'
			initialData={shopRegistrationForm}
            role='admin'
		/>
	);
}
