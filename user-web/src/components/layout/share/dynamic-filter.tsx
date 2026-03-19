import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { FilterField } from '@/types/uis/FilterField';
import { JSX, useState } from 'react';
import { Input } from '@/components/ui/input';

interface DynamicFilterProps<T> {
	title: string;
	schema: FilterField<T>[];
	onApply: (filters: Partial<T>) => void;
	initialValues?: Partial<T>;
}

export function DynamicFilter<T extends object>({
	title,
	schema,
	onApply,
	initialValues = {},
}: DynamicFilterProps<T>): JSX.Element {
	const [values, setValues] = useState<Partial<T>>(initialValues);

	const handleChange = <K extends keyof T>(key: K, value: T[K]) => {
		setValues((prev) => ({ ...prev, [key]: value }));
	};

	const handleReset = () => setValues(initialValues);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className='rounded-full'>Lọc</Button>
			</DialogTrigger>
			<DialogContent className='max-w-lg'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>

				<div className='grid grid-cols-2 gap-4'>
					{schema.map(
						(field: FilterField<T>): JSX.Element => (
							<div
								key={String(field.key)}
								className={`space-y-2 ${field.gridSpan === 2 ? 'col-span-2' : 'col-span-1'}`}
							>
								<p className='text-sm font-medium'>{field.label}</p>

								{field.type === 'select' ? (
									<Select
										value={(values[field.key] as string) || 'ALL'}
										onValueChange={(v: string): void => {
											const val = v as unknown as T[keyof T];
											handleChange(field.key, val);
										}}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='ALL'>Tất cả</SelectItem>
											{field.options?.map((opt) => (
												<SelectItem
													key={opt.value}
													value={opt.value}
												>
													{opt.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								) : (
									<Input
										type={field.type}
										placeholder={field.placeholder}
										value={(values[field.key] as string) || ''}
										onChange={(e) => {
											const rawValue: string = e.target.value;

											handleChange(
												field.key,
												(field.type === 'number'
													? Number(rawValue)
													: rawValue) as T[keyof T],
											);
										}}
									/>
								)}
							</div>
						),
					)}

					<div className='flex justify-between pt-3'>
						<Button
							variant='ghost'
							onClick={handleReset}
						>
							Reset
						</Button>
						<Button onClick={() => onApply(values)}>Áp dụng</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
