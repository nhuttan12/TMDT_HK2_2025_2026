'use client';

import { useState, JSX } from 'react';
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

export default function ChangePasswordPage(): JSX.Element {
	const [showOld, setShowOld] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogMessage, setDialogMessage] = useState('');

	const openDialog = (message: string) => {
		setDialogMessage(message);
		setDialogOpen(true);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!oldPassword || !newPassword || !confirmPassword) {
			openDialog('Vui lòng nhập đầy đủ thông tin');
			return;
		}

		if (newPassword.length < 6) {
			openDialog('Mật khẩu mới phải ít nhất 6 ký tự');
			return;
		}

		if (newPassword !== confirmPassword) {
			openDialog('Mật khẩu xác nhận không khớp');
			return;
		}

		// TODO: call API change password
		console.log('Submit change password');
	};

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
							onSubmit={handleSubmit}
							className='space-y-6'
						>
							{/* Old Password */}
							<div className='space-y-2'>
								<Label>Mật khẩu hiện tại</Label>
								<div className='relative'>
									<Input
										type={showOld ? 'text' : 'password'}
										value={oldPassword}
										onChange={(e) => setOldPassword(e.target.value)}
									/>
									<button
										type='button'
										className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500'
										onClick={() => setShowOld(!showOld)}
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
										onChange={(e) => setNewPassword(e.target.value)}
									/>
									<button
										type='button'
										className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500'
										onClick={() => setShowNew(!showNew)}
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
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
									<button
										type='button'
										className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500'
										onClick={() => setShowConfirm(!showConfirm)}
									>
										{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
									</button>
								</div>
							</div>

							<div className='flex justify-end'>
								<Button className='bg-slate-800 hover:bg-slate-900 text-white'>
									Cập nhật mật khẩu
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>

			{/* Dialog */}
			<Dialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Thông báo</DialogTitle>
						<DialogDescription>{dialogMessage}</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<Button onClick={() => setDialogOpen(false)}>Đóng</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
