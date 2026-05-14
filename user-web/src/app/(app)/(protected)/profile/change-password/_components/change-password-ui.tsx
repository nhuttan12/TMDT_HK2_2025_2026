import { JSX, SyntheticEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { ChangePasswordLogicReturn } from '@/hooks/users/profile/use-change-password-logic';

type ChangePasswordUiProps = ChangePasswordLogicReturn;

export function ChangePasswordUi({
	oldPassword,
	newPassword,
	confirmPassword,
	showOld,
	showNew,
	showConfirm,
	dialogOpen,
	dialogMessage,
	isSubmitting,
	handleOldPasswordChange,
	handleNewPasswordChange,
	handleConfirmPasswordChange,
	handleToggleShowOld,
	handleToggleShowNew,
	handleToggleShowConfirm,
	handleCloseDialog,
	handleSubmit,
}: ChangePasswordUiProps): JSX.Element {
	return (
		<div className='bg-slate-50 p-6'>
			<div className='max-w-xl mx-auto space-y-6'>
				<div>
					<h1 className='text-2xl font-bold text-slate-800'>
						<strong>Đổi mật khẩu</strong>
					</h1>
					<p className='text-slate-500 text-sm'>Cập nhật mật khẩu để bảo mật tài khoản</p>
				</div>

				<Card className='rounded-2xl shadow-sm border border-slate-200'>
					<CardHeader>
						<CardTitle>Thông tin bảo mật</CardTitle>
					</CardHeader>

					<Separator />

					<CardContent className='pt-6'>
						<form
							onSubmit={(e: SyntheticEvent<HTMLFormElement>) => handleSubmit(e)}
							className='space-y-6'
						>
							{/* Old Password */}
							<div className='space-y-2'>
								<Label>Mật khẩu hiện tại</Label>
								<div className='relative'>
									<Input
										type={showOld ? 'text' : 'password'}
										value={oldPassword}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleOldPasswordChange(e.target.value)
										}
										disabled={isSubmitting}
									/>
									<button
										type='button'
										className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer'
										onClick={() => handleToggleShowOld()}
										disabled={isSubmitting}
									>
										{showOld ? <EyeOff size={18} /> : <Eye size={18} />}
									</button>
								</div>
							</div>

							{/* New Password */}
							<div className='space-y-2'>
								<Label>Mật khẩu mới</Label>
								<div className='relative'>
									<Input
										type={showNew ? 'text' : 'password'}
										value={newPassword}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleNewPasswordChange(e.target.value)
										}
										disabled={isSubmitting}
									/>
									<button
										type='button'
										className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer'
										onClick={() => handleToggleShowNew()}
										disabled={isSubmitting}
									>
										{showNew ? <EyeOff size={18} /> : <Eye size={18} />}
									</button>
								</div>
							</div>

							{/* Confirm Password */}
							<div className='space-y-2'>
								<Label>Xác nhận mật khẩu mới</Label>
								<div className='relative'>
									<Input
										type={showConfirm ? 'text' : 'password'}
										value={confirmPassword}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
											handleConfirmPasswordChange(e.target.value)
										}
										disabled={isSubmitting}
									/>
									<button
										type='button'
										className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer'
										onClick={() => handleToggleShowConfirm()}
										disabled={isSubmitting}
									>
										{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
									</button>
								</div>
							</div>

							<div className='flex justify-end'>
								<Button
									type='submit'
									className='bg-slate-800 hover:bg-slate-900 text-white'
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>

			{/* Dialog */}
			<Dialog
				open={dialogOpen}
				onOpenChange={() => handleCloseDialog()}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Thông báo</DialogTitle>
						<DialogDescription>{dialogMessage}</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<Button onClick={() => handleCloseDialog()}>Đóng</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
