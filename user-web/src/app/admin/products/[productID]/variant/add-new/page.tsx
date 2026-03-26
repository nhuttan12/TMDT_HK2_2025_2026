import { JSX } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Thêm biến thể sản phẩm',
};

interface Props {
	params: {
		productID: string;
	};
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
	const resolvedParams = await params;

	// 2. Ép kiểu string sang number
	const productID = Number(resolvedParams.productID);

	return <div>Thêm biến thể cho sản phẩm ID: {productID}</div>;
}
