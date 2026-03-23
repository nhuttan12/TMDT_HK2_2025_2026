import { FilterSupplier } from '@/types/inventories/suppliers/FilterSupplier';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { JSX } from 'react';

function SupplierCombobox({
	suppliers,
	onSelect,
}: {
	suppliers: FilterSupplier[];
	onSelect: (supplier: FilterSupplier) => void;
}) {
	return (
		<Command>
			<CommandInput placeholder='Tìm nhà cung cấp...' />
			<CommandList>
				{suppliers.map((s: FilterSupplier): JSX.Element => (
					<CommandItem
						key={s.id}
						onSelect={(): void => onSelect(s)}
					>
						{s.name}
					</CommandItem>
				))}
			</CommandList>
		</Command>
	);
}
