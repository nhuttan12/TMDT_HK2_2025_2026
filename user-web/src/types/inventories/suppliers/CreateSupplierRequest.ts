export interface CreateSupplierRequestDto {
	name: string;
	contactName?: string;
	phone?: string;
	email?: string;
	address: string;
	taxCode: string;
}
