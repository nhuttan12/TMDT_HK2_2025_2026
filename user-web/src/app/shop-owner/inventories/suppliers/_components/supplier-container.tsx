'use client';

import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import Pagination from '@/components/layout/share/pagination';
import {
    useSupplierListLogic,
    UseSupplierListLogicReturn,
} from '@/hooks/inventories/suppliers/use-supplier-list-logic';
import { useGoodsSupplierQuery } from '@/queries/inventories/suppliers/use-goods-supplier-query';
import { Supplier } from '@/types/inventories/suppliers/Supplier';
import { JSX } from 'react';
import SupplierTable from './supplier-table';

interface SuppliersContainerProps {
	initialSuppliers: Supplier[];
}

export default function SuppliersContainer({
	initialSuppliers,
}: SuppliersContainerProps): JSX.Element {
	// 1. Data Fetching
	const { data: goods, isLoading: isProductsLoading } = useGoodsSupplierQuery(initialSuppliers);

	// 2. Logic Hook
	const logic: UseSupplierListLogicReturn = useSupplierListLogic();

	const isPageLoading: boolean = isProductsLoading;

	if (isPageLoading && !goods) {
		return <div className='p-4 text-gray-500'>Đang tải dữ liệu...</div>;
	}

	return (
		<div className='space-y-4'>
			{/* Header */}
			<AdminTableHeader
				title={'Danh sách nhà cung cấp'}
				description={'Quản lý thông tin nhà cung cấp'}
			/>

			{/* Table */}
			<SupplierTable
				suppliers={initialSuppliers}
				{...logic}
			/>

			{/* Pagination */}
			<Pagination
				currentPage={logic.currentPage}
				totalPages={10} // Hardcode tạm thời, nên thay bằng tổng số trang từ API
				onPageChange={logic.changePage}
			/>
		</div>
	);
}
