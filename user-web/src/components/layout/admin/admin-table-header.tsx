'use client';

import React, { JSX, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DynamicFilter } from '@/components/layout/share/dynamic-filter';
import { FilterField } from '@/types/uis/FilterField';
import { useQueryFilter } from '@/hooks/share/use-query-filter';
import { Timeout } from '@radix-ui/primitive';

interface Props<T> {
	title: string;
	description: string;
	searchPlaceholder?: string;
	searchKey?: keyof T;
	onAdd?: () => void;
	addLabel?: string;

	actions?: React.ReactNode;

	filter?: boolean;
	filterField?: FilterField<T>[];
}

export default function AdminTableHeader<T extends object>({
	title,
	description,
	searchPlaceholder,
	searchKey,
	onAdd,
	addLabel,
	actions,
	filter = false,
	filterField,
}: Props<T>): JSX.Element {
	const { applyFilters } = useQueryFilter<T>();

	// Search + debounce
	const [search, setSearch] = useState('');

	useEffect(() => {
		const timeout: Timeout = setTimeout((): void => {
			if (!searchKey) return;

			applyFilters({
				[searchKey]: search || undefined,
			} as Partial<T>);
		}, 500);

		return (): void => clearTimeout(timeout);
	}, [search, searchKey, applyFilters]);

	return (
		<div className='space-y-4'>
			{/* Title */}
			<div className='flex justify-between items-center'>
				<div>
					<h1 className='text-2xl font-bold'>{title}</h1>
					<p className='text-sm text-muted-foreground'>{description}</p>
				</div>

				{actions ? (
					actions
				) : onAdd && addLabel ? (
					<Button
						className='cursor-pointer'
						onClick={onAdd}
					>
						{addLabel}
					</Button>
				) : null}
			</div>

			<div className='flex gap-4'>
				{/* Search */}
				{searchPlaceholder && (
					<div className='flex justify-between items-center'>
						<Input
							placeholder={searchPlaceholder}
							className='min-w-sm w-base max-w-base'
							value={search}
							onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
								setSearch(e.target.value)
							}
						/>
					</div>
				)}

				{/* Dynamic Filter */}
				{filter && filterField && (
					<DynamicFilter<T>
						title='Bộ lọc'
						schema={filterField}
						initialValues={{} as Partial<T>}
						onApply={(filters: Partial<T>): void => {
							const normalized: Partial<T> = { ...filters };

							if ('status' in normalized) {
								const key = 'status' as keyof T;
								if (normalized[key] === 'ALL') {
									delete normalized[key];
								}
							}

							applyFilters(normalized);
						}}
					/>
				)}
			</div>
		</div>
	);
}
