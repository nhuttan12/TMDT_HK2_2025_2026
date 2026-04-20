import { JSX } from 'react';
import { Metadata } from 'next';
import SuppliersContainer from '@/app/admin/inventories/suppliers/_components/supplier-container';
import { Supplier } from '@/types/inventories/suppliers/Supplier';
import { getGoodsSupplier } from '@/services/inventories/suppliers/goods-supplier-service';

export const metadata: Metadata = {
	title: 'Quản lý thông tin nhà cung cấp',
};

export default async function Page(): Promise<JSX.Element> {
	const suppliers: Supplier[] = await getGoodsSupplier();

	return <SuppliersContainer initialSuppliers={suppliers} />;
}