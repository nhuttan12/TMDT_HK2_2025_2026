'use client';

import { JSX } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronUp, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { ProductListInfoAdmin } from '@/types/products/admin/ProductListInfoAdmin';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { formatDate } from '@/utils/shared/date';
import {
	ProductAdminSortField,
	ProductAdminSortOrder,
} from '@/types/products/admin/ProductAdminSort';
import { useTableSort } from '@/hooks/use-table-sort';
import ProductStatusBadge from '@/components/product/admin/product-status-badge';
import AdminTableHeader from '@/components/layout/admin/admin-table-header';
import ProductAdminTable from '@/app/admin/products/_components/product-admin-table';
import { usePagination } from '@/hooks/use-pagination';
import Pagination from '@/components/layout/share/pagination';

interface Props {
	products: ProductListInfoAdmin[];
}

export default function ProductAdminClient({ products }: Props): JSX.Element {
	const router: AppRouterInstance = useRouter();

	const { handleSort, renderSortIcon } = useTableSort<ProductAdminSortField>();
	const { currentPage, changePage } = usePagination();

	const handleRedirectToAddNewProduct = () => {
		router.push('/admin/products/add-new');
	};

	const handleRedirectToProductViewMode = (productID: number) => {
		router.push(`/admin/products/${productID}`);
	};

	const handleRedirectToEditProductEditMode = (userID: number) => {
		router.push(`/admin/products/update/${userID}`);
	};

	return (
		<div className='space-y-4'>
			{/* Header */}
			<AdminTableHeader
				title='Quản lý sản phẩm'
				description='Quản lý toàn bộ sản phẩm trong hệ thống'
				searchPlaceholder='Tìm sản phẩm...'
				addLabel='+ Thêm sản phẩm'
				onAdd={handleRedirectToAddNewProduct}
			/>

			{/* Table */}
			<div className='rounded-xl border bg-white'>
				<ProductAdminTable
					products={products}
					handleSort={handleSort}
					renderSortIcon={renderSortIcon}
					onView={handleRedirectToProductViewMode}
					onEdit={handleRedirectToEditProductEditMode}
				/>
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={10}
				onPageChange={changePage}
			/>
		</div>
	);
}
