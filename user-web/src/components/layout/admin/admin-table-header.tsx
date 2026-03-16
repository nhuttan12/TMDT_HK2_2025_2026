'use client';

import { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
	title: string;
	description: string;
	searchPlaceholder?: string;
	onAdd?: () => void;
	addLabel?: string;
}

export default function AdminTableHeader({
	title,
	description,
	searchPlaceholder,
	onAdd,
	addLabel,
}: Props): JSX.Element {
	return (
		<div className='space-y-4'>
			{/* Title */}
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold'>{title}</h1>
					<p className='text-sm text-muted-foreground'>{description}</p>
				</div>

				{onAdd && addLabel && (
					<Button
						className='cursor-pointer'
						onClick={onAdd}
					>
						{addLabel}
					</Button>
				)}
			</div>

			{/* Search */}
			{searchPlaceholder && (
				<div className='flex justify-between items-center'>
					<Input
						placeholder={searchPlaceholder}
						className='max-w-sm'
					/>
				</div>
			)}
		</div>
	);
}
