import { apiClient } from '@/lib/api-client';
import {
    GoodsSupplierService
} from '@/services/inventories/suppliers/goods-supplier-service';
import { Metadata } from 'next';
import { JSX } from 'react';
import SuppliersContainer from './_components/supplier-container';
import apiServer from '@/lib/api-server';

export const metadata: Metadata = {
	title: 'Quản lý thông tin nhà cung cấp',
};

export default async function Page(): Promise<JSX.Element> {
	const goodsSupplierService = new GoodsSupplierService(apiServer);

	const suppliers = await goodsSupplierService.getGoodsSupplierListPaging();

	return <SuppliersContainer initialSuppliers={suppliers} />;
}
