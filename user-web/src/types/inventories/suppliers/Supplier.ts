import { BaseSupplier } from './BaseSupplier';

export interface Supplier extends BaseSupplier {
	contactName?: string;
	phone?: string;
	email?: string;

	address?: string;

	taxCode?: string; // mã số thuế

	isActive: boolean;

	createdAt: string;
	updatedAt: string;
}