import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { ShopRegistrationForm } from '@/types/shops/user/ShopRegistrationForm';

export interface UseShopRegistrationLogicReturn {
	form: ShopRegistrationForm;
	loading: boolean;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleDescriptionChange: (val: string) => void;
	handleTermsChange: (checked: boolean) => void;
	handleSubmit: (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => Promise<void>;
}

interface UseShopRegistrationLogicProps {
	initialData?: ShopRegistrationForm;
}

export function useShopRegistrationLogic({
	initialData,
}: UseShopRegistrationLogicProps = {}): UseShopRegistrationLogicReturn {
	const router: AppRouterInstance = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	const [form, setForm] = useState<ShopRegistrationForm>(
		initialData || {
			name: '',
			email: '',
			phone: '',
			description: '',
			address: '',
			facebookUrl: '',
			bankName: '',
			accountName: '',
			accountNumber: '',
			termsAccepted: false,
		},
	);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setForm(
			(prev: ShopRegistrationForm): ShopRegistrationForm => ({
				...prev,
				[name]: value,
			}),
		);
	};

	const handleDescriptionChange = (val: string): void => {
		setForm(
			(prev: ShopRegistrationForm): ShopRegistrationForm => ({
				...prev,
				description: val,
			}),
		);
	};

	const handleTermsChange = (checked: boolean): void => {
		setForm(
			(prev: ShopRegistrationForm): ShopRegistrationForm => ({
				...prev,
				termsAccepted: checked,
			}),
		);
	};

	const handleSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>): Promise<void> => {
		e.preventDefault();

		if (!form.termsAccepted) {
			// Trong thực tế sẽ gọi Toast thông báo lỗi
			alert('Bạn phải đồng ý với Điều khoản của sàn!');
			return;
		}

		try {
			setLoading(true);
			console.log('Gửi đơn đăng ký mở cửa hàng:', form);
			// Giả lập gọi API: await postShopRegistration(form);

			// Chuyển hướng sang trang thành công/chờ duyệt
			router.push('/seller/registration-success');
		} catch (error) {
			console.error('Lỗi đăng ký:', error);
		} finally {
			setLoading(false);
		}
	};

	return {
		form: form,
		loading: loading,
		handleInputChange: handleInputChange,
		handleDescriptionChange: handleDescriptionChange,
		handleTermsChange: handleTermsChange,
		handleSubmit: handleSubmit,
	};
}
