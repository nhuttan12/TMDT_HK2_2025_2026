'use client';

import { JSX } from 'react';
import { GoodsIssueList } from '@/types/inventories/issues/uis/GoodsIssueList';
import { useGoodsIssueAdminQuery } from '@/queries/inventories/goods-issues/use-goods-issue-admin-query';
import {
	GoodsIssueAdminLogicReturn,
	useGoodsIssueAdminLogic,
} from '@/hooks/inventories/goods-issues/use-goods-issue-admin-logic';
import { GoodsIssueAdminUi } from './goods-issue-admin-ui';

interface GoodsIssueAdminContainerProps {
	initialIssues: GoodsIssueList[];
}

export default function GoodsIssueAdminContainer({
	initialIssues,
}: GoodsIssueAdminContainerProps): JSX.Element {
	const { data: issues = [], isLoading } = useGoodsIssueAdminQuery(initialIssues);
	const logic: GoodsIssueAdminLogicReturn = useGoodsIssueAdminLogic();

	return (
		<GoodsIssueAdminUi
			issues={issues}
			isLoading={isLoading}
			{...logic}
		/>
	);
}
