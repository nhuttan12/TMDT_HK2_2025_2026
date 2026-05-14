import { JSX } from 'react';
import { GoodsIssueStatus } from '@/types/inventories/issues/uis/GoodsIssueStatus';
import { getGoodsIssueStatusLabel } from '@/utils/inventories/issues/goods-issue-status-label';

interface Props {
	status: GoodsIssueStatus;
}

export default function GoodsIssueStatusBadge({ status }: Props): JSX.Element {
	const statusStyles: Record<GoodsIssueStatus, string> = {
		draft: 'bg-gray-100 text-gray-600 border-gray-200',
		confirmed: 'bg-green-100 text-green-700 border-green-200',
		cancelled: 'bg-red-100 text-red-700 border-red-200',
	};

	const label: string = getGoodsIssueStatusLabel(status);

	const baseClass: string = 'px-2.5 py-0.5 rounded-full text-xs font-semibold border';
	const dynamicClass: string = statusStyles[status];
	const finalClassName: string = baseClass + ' ' + dynamicClass;

	return <span className={finalClassName}>{label}</span>;
}
