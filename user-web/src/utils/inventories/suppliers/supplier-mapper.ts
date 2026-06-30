import { CreateSupplierRequestDto } from '@/types/inventories/suppliers/CreateSupplierRequest';
import { Supplier } from '@/types/inventories/suppliers/Supplier';

export const mapSupplierToCreateSupplierRequest = (
	supplier: Supplier,
): CreateSupplierRequestDto => {
	return {
		name: supplier.name,
		contactName: supplier.contactName,
		phone: supplier.phone,
		email: supplier.email,
		address: supplier.address,
		taxCode: supplier.taxCode,
	};
};
