'use client';

import { JSX } from 'react';
import { Supplier } from '@/types/inventories/suppliers/Supplier';
import { AdminFormType } from '@/types/shared/admin/AdminFormType';
import {
	useSupplierFormLogic,
	UseSupplierFormLogicReturn,
} from '@/hooks/inventories/suppliers/use-supplier-form-logic';
import SupplierFormUi from '@/app/admin/inventories/suppliers/[supplierId]/edit/_components/supplier-form-ui';

interface SupplierFormContainerProps {
	supplier: Supplier;
	mode: AdminFormType;
}

export default function SupplierFormContainer({
	supplier,
	mode,
}: SupplierFormContainerProps): JSX.Element {
	const supplierFormLogic: UseSupplierFormLogicReturn = useSupplierFormLogic({
		formType: mode,
		supplier: supplier,
	});

	return <SupplierFormUi {...supplierFormLogic} />;
}
