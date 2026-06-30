import { useCreateSupplierMutation } from '@/queries/inventories/suppliers/use-create-supplier-mutation';
import { Supplier } from '@/types/inventories/suppliers/Supplier';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { mapSupplierToCreateSupplierRequest } from '@/utils/inventories/suppliers/supplier-mapper';
import { useRouter } from 'next/navigation';
import { ChangeEvent, SyntheticEvent, useState } from 'react';

interface UseSupplierLogicProps {
	formType: AdminFormType;
	supplier: Supplier;
}

export interface UseSupplierFormLogicReturn {
	form: Supplier;
	isView: boolean;
	isCreate: boolean;
    isSubmitting: boolean;
	handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleTaxCodeChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleContactNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleAddressChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onFormSubmit: (e: SyntheticEvent) => Promise<void>;
	handleBack: () => void;
}

export function useSupplierFormLogic(props: UseSupplierLogicProps): UseSupplierFormLogicReturn {
	const router = useRouter();

	const isView = props.formType === 'view';
	const isCreate = props.formType === 'create';

	const createMutation = useCreateSupplierMutation();

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
	const onFormSubmit = async (e: SyntheticEvent): Promise<void> => {
		e.preventDefault();

        const request = mapSupplierToCreateSupplierRequest(form);

		// Tránh bấm submit nhiều lần liên tục
		if (createMutation.isPending) return;

		// Gọi hàm mutate để bắt đầu gửi request
		createMutation.mutate(request, {
			onSuccess: (newSupplierId) => {
				if (newSupplierId) {
					console.log('Tạo thành công, ID mới:', newSupplierId);
					router.push('/shop-owner/inventories/suppliers');
				} else {
					console.error('Tạo thất bại!');
					router.push('/shop-owner/inventories/suppliers');
				}
			},
		});
	};

	// Hàm quay lại trang trước
	const handleBack = (): void => {
		router.back();
	};

	return {
		form,
		isView,
		isCreate,
        isSubmitting: createMutation.isPending,
		handleNameChange,
		handleTaxCodeChange,
		handleContactNameChange,
		handlePhoneChange,
		handleEmailChange,
		handleAddressChange,
		onFormSubmit,
		handleBack,
	};
}
