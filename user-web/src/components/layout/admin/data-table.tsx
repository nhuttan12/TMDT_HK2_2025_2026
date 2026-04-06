import { Column } from '@/types/uis/Column';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React, { JSX } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface DataTableProps<T> {
	data: T[];
	columns: Column<T>[];
	onRowClick?: (row: T) => void;
	getRowKey: (row: T) => number;
	tableHeight?: number;
	stickyHeader?: boolean;

	selectable?: {
		selected: number[];
		onToggle: (id: number) => void;
		onToggleAll: () => void;
		isAllSelected?: boolean;
		isIndeterminate?: boolean;
	};
}

export function DataTable<T extends object>({
	data,
	columns,
	onRowClick,
	getRowKey,
	selectable,
	stickyHeader = true,
	tableHeight = 500,
}: DataTableProps<T>): JSX.Element {
	let finalColumns: Column<T>[] = columns;

	const borderClass: string = 'border! border-gray-500!';
	const overflowClass = stickyHeader ? 'overflow-y-scroll' : 'overflow-y-auto';

	if (selectable) {
		const selectColumn: Column<T> = {
			key: '__select',
			header: (
				<Checkbox
					data-no-row-click
					className={borderClass}
					checked={selectable.isAllSelected ?? selectable.selected.length === data.length}
					ref={(el: HTMLButtonElement): void => {
						if (el && selectable.isIndeterminate !== undefined) {
							(el as HTMLInputElement).indeterminate = selectable.isIndeterminate;
						}
					}}
					onCheckedChange={(): void => {
						selectable.onToggleAll();
					}}
					onClick={(e: React.MouseEvent<HTMLButtonElement>): void => e.stopPropagation()}
				/>
			),
			render: (row: T): JSX.Element => {
				const id: number = getRowKey(row);

				return (
					<Checkbox
						className={borderClass}
						checked={selectable.selected.includes(id)}
						onClick={(e: React.MouseEvent<HTMLButtonElement>): void =>
							e.stopPropagation()
						}
						onMouseDown={(e: React.MouseEvent<HTMLButtonElement>): void =>
							e.stopPropagation()
						}
						onPointerDown={(e: React.MouseEvent<HTMLButtonElement>): void =>
							e.stopPropagation()
						}
						onCheckedChange={(): void => {
							selectable.onToggle(id);
						}}
					/>
				);
			},
		};

		finalColumns = [selectColumn, ...columns];
	}

	return (
		<div
			style={{ height: `${tableHeight}px`, maxHeight: `${tableHeight}px` }}
			className={`${overflowClass} shadow-lg rounded-sm overflow-x-auto`}
		>
			<Table>
				<TableHeader className='sticky top-0 bg-white z-10 border-b! border-gray-400!'>
					<TableRow>
						{finalColumns.map(
							(col: Column<T>): JSX.Element => (
								<TableHead
									key={String(col.key)}
									className={
										col.onHeaderClick ? 'cursor-pointer select-none' : ''
									}
									onClick={(e: React.MouseEvent<HTMLTableCellElement>): void => {
										const target = e.target as HTMLElement;

										if (e.currentTarget !== e.target) return;

										if (
											target.closest('button') ||
											target.closest('input') ||
											target.closest('[role="checkbox"]') ||
											target.closest('[data-no-row-click]')
										) {
											return;
										}

										col.onHeaderClick?.(e);
									}}
								>
									<b>{col.header}</b>
								</TableHead>
							),
						)}
					</TableRow>
				</TableHeader>

				<TableBody>
					{data.map(
						(row: T, rowIndex: number): JSX.Element => (
							<TableRow
								key={getRowKey(row)}
								onClick={(e: React.MouseEvent<HTMLTableRowElement>): void => {
									// Nếu click từ element có data-no-row-click → bỏ qua
									const target = e.target as HTMLElement;

									if (
										target.closest('button') ||
										target.closest('input') ||
										target.closest('[role="checkbox"]') ||
										target.closest('[data-no-row-click]')
									) {
										return;
									}

									onRowClick?.(row);
								}}
								className='cursor-pointer'
							>
								{finalColumns.map(
									(col: Column<T>): JSX.Element => (
										<TableCell key={String(col.key)}>
											{col.render
												? col.render(row, rowIndex)
												: col.key in row
													? (row[col.key as keyof T] as React.ReactNode)
													: null}
										</TableCell>
									),
								)}
							</TableRow>
						),
					)}
				</TableBody>
			</Table>
		</div>
	);
}
