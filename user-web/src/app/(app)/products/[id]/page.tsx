import { JSX } from 'react';

interface Props {
	params: { id: string };
}

export default function ProductListPage({ params }: Props): JSX.Element {
	return (
		<div>
			<h1>Chi tiết sản phẩm</h1>
			<div>Product ID: {params.id}</div>
			<p>Mô tả...</p>
		</div>
	);
}
