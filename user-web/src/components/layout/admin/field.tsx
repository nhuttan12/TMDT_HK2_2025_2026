import React, { JSX } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FieldProps {
	label: string;
	children: React.ReactNode;
	className?: string;
}

export default function Field({ label, children, className }: FieldProps): JSX.Element {
	return (
		<div className={cn('space-y-2', className)}>
			<Label>{label}</Label>
			{children}
		</div>
	);
}
