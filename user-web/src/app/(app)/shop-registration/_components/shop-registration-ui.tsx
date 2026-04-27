import { JSX } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import Field from '@/components/layout/admin/field';
import RichTextEditor from '@/components/layout/admin/rich-text-editor';
import { UseShopRegistrationLogicReturn } from '@/hooks/shops/user/use-shop-registration-logic';

type Props = UseShopRegistrationLogicReturn

export default function ShopRegistrationUi({
	form,
	loading,
	handleInputChange,
	handleDescriptionChange,
	handleTermsChange,
	handleSubmit,
}: Props): JSX.Element {
	return (
		<div className='max-w-4xl mx-auto py-10'>
			<div className='mb-8 text-center'>
				<h1 className='text-3xl font-bold tracking-tight text-slate-900'>
					Đăng ký trở thành Nhà bán hàng
				</h1>
				<p className='text-slate-500 mt-2'>
					Hãy điền thông tin bên dưới để bắt đầu kinh doanh trên nền tảng của chúng tôi.
				</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className='space-y-6'
			>
				{/* Section 1: Thông tin cơ bản */}
				<Card>
					<CardHeader>
						<CardTitle>1. Thông tin cơ bản</CardTitle>
						<CardDescription>
							Những thông tin này sẽ hiển thị trực tiếp với khách hàng.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<Field label='Tên cửa hàng (Bắt buộc)'>
							<Input
								name='name'
								placeholder='VD: Terrarium VN'
								value={form.name}
								onChange={handleInputChange}
								required
							/>
						</Field>

						<div className='grid grid-cols-2 gap-4'>
							<Field label='Email hỗ trợ (Bắt buộc)'>
								<Input
									name='email'
									type='email'
									placeholder='cskh@cuahang.com'
									value={form.email}
									onChange={handleInputChange}
									required
								/>
							</Field>
							<Field label='Hotline CSKH (Bắt buộc)'>
								<Input
									name='phone'
									type='tel'
									placeholder='0909xxxxxx'
									value={form.phone}
									onChange={handleInputChange}
									required
								/>
							</Field>
						</div>

						<Field label='Mô tả cửa hàng (Giới thiệu)'>
							<RichTextEditor
								value={form.description}
								onChange={handleDescriptionChange}
								disabled={false}
							/>
						</Field>
					</CardContent>
				</Card>

				{/* Section 2: Vận hành & Thanh toán */}
				<Card>
					<CardHeader>
						<CardTitle>2. Vận hành & Đối soát</CardTitle>
						<CardDescription>
							Địa chỉ lấy hàng và tài khoản nhận tiền bán hàng từ Sàn.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<Field label='Địa chỉ kho lấy hàng (Bắt buộc)'>
							<Input
								name='address'
								placeholder='VD: 123 Đường ABC, Phường X, Quận Y, TPHCM'
								value={form.address}
								onChange={handleInputChange}
								required
							/>
						</Field>

						<div className='grid grid-cols-2 gap-4'>
							<Field label='Tên Ngân hàng'>
								<Input
									name='bankName'
									placeholder='VD: Vietcombank'
									value={form.bankName}
									onChange={handleInputChange}
									required
								/>
							</Field>
							<Field label='Tên Chủ Tài Khoản'>
								<Input
									name='accountName'
									placeholder='VD: NGUYEN VAN A'
									value={form.accountName}
									onChange={handleInputChange}
									required
								/>
							</Field>
						</div>

						<div className='w-1/2 pr-2'>
							<Field label='Số Tài Khoản'>
								<Input
									name='accountNumber'
									placeholder='Nhập số tài khoản hợp lệ'
									value={form.accountNumber}
									onChange={handleInputChange}
									required
								/>
							</Field>
						</div>
					</CardContent>
				</Card>

				{/* Section 3: Cấu hình SEO & Kênh ngoài (Tùy chọn) */}
				<Card>
					<CardHeader>
						<CardTitle>3. Tối ưu hiển thị (Tùy chọn)</CardTitle>
						<CardDescription>
							Cấu hình thêm để cửa hàng của bạn nổi bật hơn trên công cụ tìm kiếm.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<Field label='Đường dẫn Fanpage (Facebook)'>
							<Input
								name='facebookUrl'
								placeholder='https://facebook.com/...'
								value={form.facebookUrl}
								onChange={handleInputChange}
							/>
						</Field>

						<Field label='Tiêu đề SEO (Hiển thị trên Google)'>
							<Input
								name='seoTitle'
								placeholder='VD: Terrarium VN - Rừng cây trong bể kính'
								value={form.seoTitle}
								onChange={handleInputChange}
							/>
						</Field>

						<Field label='Mô tả SEO (Meta Description)'>
							<Input
								name='metaDescription'
								placeholder='Nhập mô tả ngắn gọn giúp tối ưu tìm kiếm...'
								value={form.metaDescription}
								onChange={handleInputChange}
							/>
						</Field>
					</CardContent>
				</Card>

				{/* Section 4: Chốt Đơn */}
				<div className='bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col items-center gap-4'>
					<div className='flex items-center space-x-2'>
						<Checkbox
							id='terms'
							checked={form.termsAccepted}
							onCheckedChange={handleTermsChange}
						/>
						<Label
							htmlFor='terms'
							className='text-sm text-slate-700 cursor-pointer'
						>
							Tôi xác nhận các thông tin trên là chính xác và đồng ý với{' '}
							<span className='text-blue-600 underline'>
								Chính sách & Điều khoản của Sàn
							</span>
							.
						</Label>
					</div>

					<Button
						type='submit'
						size='lg'
						disabled={loading || !form.termsAccepted}
						className='w-full max-w-sm font-semibold cursor-pointer text-base h-12'
					>
						{loading ? 'Đang gửi đăng ký...' : 'Gửi Đơn Đăng Ký'}
					</Button>
				</div>
			</form>
		</div>
	);
}
