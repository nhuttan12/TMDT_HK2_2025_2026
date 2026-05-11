import { JSX } from 'react';
import { Metadata } from 'next';
import { Supplier } from '@/types/inventories/suppliers/Supplier';
import { getGoodsSupplier } from '@/services/inventories/suppliers/goods-supplier-service';
import SuppliersContainer from './_components/supplier-container';

export const metadata: Metadata = {
	title: 'Quản lý thông tin nhà cung cấp',
};

export default async function Page(): Promise<JSX.Element> {
	const suppliers: Supplier[] = await getGoodsSupplier();

	return <SuppliersContainer initialSuppliers={suppliers} />;
}