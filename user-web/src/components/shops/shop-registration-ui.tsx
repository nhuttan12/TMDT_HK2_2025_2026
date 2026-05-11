import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { JSX } from 'react';

import Field from '@/components/layout/admin/field';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { UseShopRegistrationLogicReturn } from '@/hooks/shops/user/use-shop-registration-logic';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import { AdminFormWrapper } from '../layout/admin/admin-form-wrapper';
import { AppRole } from '@/types/uis/AppRole';

export interface ShopRegistrationUiProps extends UseShopRegistrationLogicReturn {
	formType?: AdminFormType;
	role: AppRole;
}

export default function ShopRegistrationUi({
	form,
	loading,
	formType = 'create',
	role,
	handleInputChange,
	handleDescriptionChange,
	handleTermsChange,
	handleSubmit,
    handleApprove,
    handleReject
}: ShopRegistrationUiProps): JSX.Element {
	const isView = formType === 'view';

	// Xử lý Tiêu đề & Mô tả tự động
	const formTitle = isView
		? `Chi tiết đơn đăng ký ${form.id ? `#${form.id}` : ''}: ${form.name}`
		: 'Đăng ký trở thành Nhà bán hàng';

	const formDescription = isView
		? 'Xem chi tiết thông tin gian hàng đăng ký.'
		: 'Hãy điền thông tin bên dưới để bắt đầu kinh doanh trên nền tảng của chúng tôi.';

	// Logic tách biệt vùng Actions theo Role
	let formActions: React.ReactNode = null;

	if (role === 'admin' && isView) {
		// Nhánh 1: Giao diện duyệt của Admin
		formActions = (
			<div className='flex items-center justify-center gap-4 p-6 mt-6 border rounded-xl'>
				<Button
					type='button' // Tránh trigger submit form
					variant='outline'
					onClick={handleReject}
					disabled={loading}
					className='w-40 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700'
				>
					Từ chối
				</Button>
				<Button
					type='button'
					onClick={handleApprove}
					disabled={loading}
					className='w-40 text-white'
				>
					{loading ? 'Đang xử lý...' : 'Phê duyệt'}
				</Button>
			</div>
		);
	} else if (role === 'customer' && !isView) {
		// Nhánh 2: Giao diện nộp đơn của Customer
		formActions = (
			<div className='flex flex-col items-center gap-4 p-6 mt-6 border bg-slate-50 rounded-xl border-slate-200'>
				<div className='flex items-center space-x-2'>
					<Checkbox
						id='terms'
						checked={form.termsAccepted}
						onCheckedChange={handleTermsChange}
					/>
					<Label
						htmlFor='terms'
						className='text-sm cursor-pointer text-slate-700'
					>
						Tôi xác nhận các thông tin trên là chính xác và đồng ý với điều khoản.
					</Label>
				</div>

				<Button
					type='submit'
					size='lg'
					disabled={loading || !form.termsAccepted}
					className='w-full max-w-sm h-12 font-semibold text-white cursor-pointer'
				>
					{loading ? 'Đang gửi đăng ký...' : 'Gửi Đơn Đăng Ký'}
				</Button>
			</div>
		);
	}

	return (
		<AdminFormWrapper
			title={formTitle}
			description={formDescription}
			onSubmit={handleSubmit}
			actions={formActions}
		>
			{/* Section 1: Thông tin cơ bản */}
			<Card>
				<CardHeader>
					<CardTitle>1. Thông tin cơ bản</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<Field label='Tên cửa hàng (Bắt buộc)'>
						<Input
							name='name'
							value={form.name}
							onChange={handleInputChange}
							disabled={isView}
							required
						/>
					</Field>

					<div className='grid grid-cols-2 gap-4'>
						<Field label='Email hỗ trợ (Bắt buộc)'>
							<Input
								name='email'
								type='email'
								value={form.email}
								onChange={handleInputChange}
								disabled={isView}
								required
							/>
						</Field>
						<Field label='Hotline CSKH (Bắt buộc)'>
							<Input
								name='phone'
								type='tel'
								value={form.phone}
								onChange={handleInputChange}
								disabled={isView}
								required
							/>
						</Field>
					</div>

					<Field label='Mô tả cửa hàng (Giới thiệu)'>
						<RichTextEditor
							value={form.description}
							onChange={handleDescriptionChange}
							disabled={isView}
						/>
					</Field>
				</CardContent>
			</Card>

			{/* Section 2: Vận hành & Thanh toán */}
			<Card>
				<CardHeader>
					<CardTitle>2. Vận hành & Đối soát</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<Field label='Địa chỉ kho lấy hàng (Bắt buộc)'>
						<Input
							name='address'
							value={form.address}
							onChange={handleInputChange}
							disabled={isView}
							required
						/>
					</Field>

					<div className='grid grid-cols-2 gap-4'>
						<Field label='Tên Ngân hàng'>
							<Input
								name='bankName'
								value={form.bankName}
								onChange={handleInputChange}
								disabled={isView}
								required
							/>
						</Field>
						<Field label='Tên Chủ Tài Khoản'>
							<Input
								name='accountName'
								value={form.accountName}
								onChange={handleInputChange}
								disabled={isView}
								required
							/>
						</Field>
					</div>

					<div className='w-1/2 pr-2'>
						<Field label='Số Tài Khoản'>
							<Input
								name='accountNumber'
								value={form.accountNumber}
								onChange={handleInputChange}
								disabled={isView}
								required
							/>
						</Field>
					</div>
				</CardContent>
			</Card>

			{/* Section 3: Cấu hình SEO & Kênh ngoài */}
			<Card>
				<CardHeader>
					<CardTitle>3. Tối ưu hiển thị</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<Field label='Đường dẫn Fanpage (Facebook)'>
						<Input
							name='facebookUrl'
							value={form.facebookUrl}
							onChange={handleInputChange}
							disabled={isView}
						/>
					</Field>
				</CardContent>
			</Card>
		</AdminFormWrapper>
	);
}
