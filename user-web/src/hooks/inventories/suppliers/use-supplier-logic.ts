import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { Supplier } from '@/types/inventories/suppliers/Supplier';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface UseSupplierLogicProps {
	formType: AdminFormType;
	supplier: Supplier;
}

export function useSupplierLogic(props: UseSupplierLogicProps) {
	const router: AppRouterInstance = useRouter();

	const isView: boolean = props.formType === 'view';
	const isCreate: boolean = props.formType === 'create';

	// Khởi tạo state cho form dựa trên dữ liệu truyền vào
	const [form, setForm] = useState<Supplier>(props.supplier);

	// Hàm Generic cập nhật field an toàn với TypeScript
	const updateField = <K extends keyof Supplier>(key: K, value: Supplier[K]): void => {
		setForm((prev: Supplier): Supplier => {
			return { ...prev, [key]: value };
		});
	};

	// Các hàm xử lý sự kiện OnChange cho từng input
	const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
		updateField('name', e.target.value);
	};

	const handleTaxCodeChange = (e: ChangeEvent<HTMLInputElement>): void => {
		updateField('taxCode', e.target.value);
	};

	const handleContactNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
		updateField('contactName', e.target.value);
	};

	const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
		updateField('phone', e.target.value);
	};

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
		updateField('email', e.target.value);
	};

	const handleAddressChange = (e: ChangeEvent<HTMLInputElement>): void => {
		updateField('address', e.target.value);
	};

	// Hàm xử lý Submit Form (Có giả lập delay mạng)
	const onFormSubmit = async (e: FormEvent): Promise<void> => {
		if (e) {
			e.preventDefault();
		}

		return new Promise<void>((resolve) => {
			// Giả lập độ trễ mạng để test UI Loading/Modal
			setTimeout(() => {
				console.log('Dữ liệu Supplier chuẩn bị gửi đi:', form);
				resolve();
			}, 1500);
		});
	};

	// Hàm quay lại trang trước
	const handleBack = (): void => {
		router.back();
	};

	return {
		form: form,
		isView: isView,
		isCreate: isCreate,
		handleNameChange: handleNameChange,
		handleTaxCodeChange: handleTaxCodeChange,
		handleContactNameChange: handleContactNameChange,
		handlePhoneChange: handlePhoneChange,
		handleEmailChange: handleEmailChange,
		handleAddressChange: handleAddressChange,
		onFormSubmit: onFormSubmit,
		handleBack: handleBack,
	};
}
