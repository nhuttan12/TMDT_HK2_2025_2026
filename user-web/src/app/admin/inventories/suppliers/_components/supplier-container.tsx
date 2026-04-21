'use client';

import React, { JSX } from 'react';
import SupplierTable from '@/app/admin/inventories/suppliers/_components/supplier-table';
import { Supplier } from '@/types/inventories/suppliers/Supplier';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import Pagination from '@/components/layout/share/pagination';
import { usePagination } from '@/hooks/share/use-pagination';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useGoodsSupplierQuery } from '@/queries/inventories/suppliers/use-goods-supplier-query';

interface SuppliersContainerProps {
	initialSuppliers: Supplier[];
}

export default function SuppliersContainer({
	initialSuppliers,
}: SuppliersContainerProps): JSX.Element {
	const { data: goods, isLoading: isProductsLoading } = useGoodsSupplierQuery(initialSuppliers);

	const router: AppRouterInstance = useRouter();
	const { currentPage, changePage } = usePagination();

	const isPageLoading: boolean = isProductsLoading;

	if (isPageLoading && !goods) {
		return <div className='p-4 text-gray-500'>Đang tải dữ liệu...</div>;
	}

	const handleViewSupplier = (supplierId: number) => {
		router.push(`/admin/inventories/suppliers/${supplierId}/products`);
	};

	const handleEditSupplier = (supplierId: number) => {
		router.push(`/admin/inventories/suppliers/${supplierId}/edit`);
	};

	const handleDeleteSupplier = (supplierId: number) => {}

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
				onViewSupplier={handleViewSupplier}
				onEditSupplier={handleEditSupplier}
				onDeleteSupplier={handleDeleteSupplier}
			/>

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalPages={10}
				onPageChange={changePage}
			/>
		</div>
	);
}
