import { JSX } from 'react';
import ProductCart from './ProductCard';
import { ProductSummary } from '@/types/product-summary';

const list: ProductSummary[] = [
	{
		productID: 1,
		name: 'Orange',
		imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZbB_doR9LVg_xVbDXOOZc3TNbgNCEIzLLKw&s',
		price: 5.5,
		isInWishlist: true,
		rating: 4.6,
		discount: 0,
	},
	{
		productID: 2,
		name: 'Tangerine',
		imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-fSVx2LYnvTgOi1oiw2lONk1EkZf3ZOJTGQ&s',
		price: 3.0,
		isInWishlist: false,
		rating: 4.7,
		discount: 0,
	},
	{
		productID: 3,
		name: 'Raspberry',
		imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk-k_lv6L0dU7km1VpLN0IQV-Nr8jVNS69vw&s',
		price: 10.0,
		isInWishlist: false,
		rating: 4.5,
		discount: 0,
	},
	{
		productID: 4,
		name: 'Lemon',
		imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQg7t4ogMfd_ii5A99O4xakAhyFqnjYecZAw&s',
		price: 5.3,
		isInWishlist: false,
		rating: 4.7,
		discount: 0.5,
	},
	{
		productID: 5,
		name: 'Avocado',
		imgUrl: 'https://domf5oio6qrcr.cloudfront.net/medialibrary/16762/gettyimages-961101662.jpg',
		price: 15.7,
		isInWishlist: true,
		rating: 4.5,
		discount: 0,
	},
	{
		productID: 6,
		name: 'Lemon 2',
		imgUrl: 'https://media.istockphoto.com/id/1130558991/photo/whole-lemon-isolated-on-white-background-clipping-path-full-depth-of-field.jpg?s=612x612&w=0&k=20&c=un9FPAWPWX5VDdWrV_FIv1-M5sPD6z_isJZA6HFyy_I=',
		price: 8.0,
		isInWishlist: false,
		rating: 4.7,
		discount: 0.5,
	},
	{
		productID: 7,
		name: 'Banana',
		imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMZw3NVvQB7ew-0I7zWlJw5b6iaU9TrcGY4Q&s',
		price: 7.5,
		isInWishlist: true,
		rating: 4.7,
		discount: 0,
	},
	{
		productID: 8,
		name: 'Watermelon',
		imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCR2eBUKsjuLAl0oqz7YvkZJFU1C3znejG4g&s',
		price: 12.2,
		isInWishlist: false,
		rating: 5.0,
		discount: 0.3,
	},
];

export default function ProductList(): JSX.Element {
	return (
		<div className='gap-6 grid grid-cols-2 sm:grid-cols-4 pt-6'>
			{list.map(
				(item: ProductSummary): JSX.Element => (
					<ProductCart
						product={item}
						key={item.productID}
					/>
				),
			)}
		</div>
	);
}
