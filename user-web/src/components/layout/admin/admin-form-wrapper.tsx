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
				className='space-y-6 w-full max-w-4xl mx-auto mt-5 shadow-xl p-7 rounded-2xl border'
			>
				{children}
				{actions}
			</form>
		</>
	);
}
