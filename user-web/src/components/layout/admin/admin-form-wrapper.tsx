import React, { JSX, SyntheticEvent } from 'react';

interface AdminFormWrapperProps {
	title: string;
	description: string;
	onSubmit: (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => void;
	children: React.ReactNode;
	actions?: React.ReactNode;
}

export function AdminFormWrapper({
	title,
	description,
	onSubmit,
	children,
	actions,
}: AdminFormWrapperProps): JSX.Element {
	return (
		<>
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold'>{title}</h1>
					<p className='text-sm text-muted-foreground'>{description}</p>
				</div>
			</div>

			<form
				onSubmit={onSubmit}
				className='relative w-full max-w-4xl mx-auto mt-5'
			>
				<div className='p-7 pb-1 space-y-6 bg-white border shadow-sm rounded-2xl border-slate-200'>
					{children}

					{actions && (
						<div className='flex justify-end gap-4 p-4 mt-2 bg-white border rounded-xl border-slate-200'>
							{actions}
						</div>
					)}
				</div>
			</form>
		</>
	);
}
