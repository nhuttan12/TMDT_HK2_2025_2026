import { Star } from 'lucide-react';
import { JSX } from 'react';

interface RatingProps {
	rating: number;
}

export default function Rating({ rating }: RatingProps): JSX.Element {
	const fullStars: number = Math.floor(rating);
	const hasHalfStar: boolean = rating % 1 >= 0.5;
	const emptyStars: number = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<div className='flex items-center'>
			{/* Full stars */}
			{Array.from({ length: fullStars }).map(
				(_, i: number): JSX.Element => (
					<Star
						key={`full-${i}`}
						size={14}
						fill='#dfe519'
						stroke='#dfe519'
						className='mr-1'
					/>
				),
			)}

			{/* Half star */}
			{hasHalfStar && (
				<div className='relative mr-1'>
					<Star
						size={14}
						stroke='#dfe519'
					/>
					<div className='absolute top-0 left-0 overflow-hidden w-1/2'>
						<Star
							size={14}
							fill='#dfe519'
							stroke='#dfe519'
						/>
					</div>
				</div>
			)}

			{/* Empty stars */}
			{Array.from({ length: emptyStars }).map((_, i) => (
				<Star
					key={`empty-${i}`}
					size={14}
					stroke='#dfe519'
					className='mr-1'
				/>
			))}
		</div>
	);
}
