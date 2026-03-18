import React, { JSX } from 'react';
import { Label } from '@/components/ui/label';

interface FieldProps {
	label: string;
	children: React.ReactNode;
}

export default function Field({ label, children }: FieldProps): JSX.Element {
	return (
		<div className='space-y-2'>
			<Label>{label}</Label>
			{children}
		</div>
	);
}