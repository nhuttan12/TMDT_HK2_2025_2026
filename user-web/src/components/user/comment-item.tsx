import { JSX } from 'react';
import Rating from './rating';
import { CommentModel } from '@/types/products/user/CommentModel';

interface Props {
	comment: CommentModel;
}

export default function CommentItem({ comment }: Props): JSX.Element {
	return (
		<div className='border-b pb-6'>
			{/* USER COMMENT */}
			<div className='flex gap-3'>
				<div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold'>
					{comment.userName.charAt(0)}
				</div>

				<div className='flex-1'>
					<div className='flex items-center gap-2'>
						<span className='font-semibold'>{comment.userName}</span>
						<span className='text-xs text-gray-500'>{comment.createdAt}</span>
					</div>

					<div className='flex mt-1'>
						<Rating rating={comment.rating} />
					</div>

					<p className='mt-2 text-sm'>{comment.content}</p>
				</div>
			</div>

			{/* SHOP REPLY */}
			{comment.shopReply && (
				<div className='ml-11 mt-4 bg-gray-50 border rounded-lg p-4'>
					<div className='font-semibold text-sm text-blue-600'>Phản hồi từ cửa hàng</div>

					<p className='mt-2 text-sm'>{comment.shopReply.content}</p>

					<div className='text-xs text-gray-500 mt-2'>{comment.shopReply.createdAt}</div>
				</div>
			)}
		</div>
	);
}
