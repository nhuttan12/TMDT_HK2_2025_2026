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
import { parseToNumber } from '@/utils/shared/mappers/parseToNumber';

interface DataTableProps<T> {
	data: T[];
	columns: Column<T>[];
	onRowClick?: (row: T) => void;
	getRowKey: (row: T) => number;
	tableHeight?: number;

	selectable?: {
		selected: number[];
		onToggle: (id: number) => void;
		onToggleAll: (ids: number[]) => void;
	};
}

export function DataTable<T extends object>({
	data,
	columns,
	onRowClick,
	getRowKey,
	selectable,
	tableHeight = 500,
}: DataTableProps<T>): JSX.Element {
	let finalColumns: Column<T>[] = columns;

	const borderClass: string = 'border! border-gray-500!';

	if (selectable) {
		const selectColumn: Column<T> = {
			key: '__select',
			header: (
				<Checkbox
					className={borderClass}
					checked={selectable.selected.length === data.length}
					onCheckedChange={(): void => {
						if (selectable.selected.length === data.length) {
							selectable.onToggleAll([]);
						} else {
							selectable.onToggleAll(data.map((row: T): number => getRowKey(row)));
						}
					}}
					onClick={(e: React.MouseEvent<HTMLButtonElement>): void => e.stopPropagation()}
				/>
			),
			render: (row: T): JSX.Element => {
				const rawID: string | number = getRowKey(row);
				const id: number = parseToNumber(rawID);

				return (
					<Checkbox
						className={borderClass}
						checked={selectable.selected.includes(id)}
						onClick={(e) => e.stopPropagation()}
						onCheckedChange={() => {
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
			className="overflow-y-scroll shadow-lg rounded-sm"
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
									onClick={col.onHeaderClick}
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
								onClick={(): void | undefined => onRowClick?.(row)}
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
