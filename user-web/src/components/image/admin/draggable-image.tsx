import { SortableImageForm } from '@/types/images/admin/SortableImageForm';
import { useDrag, useDrop } from 'react-dnd';
import { JSX } from 'react';

const TYPE = 'IMAGE';

interface Props {
	img: SortableImageForm;
	index: number;
	move: (from: number, to: number) => void;
	children: React.ReactNode;
}

export function DraggableImage({ img, index, move, children }: Props): JSX.Element {
	const [, drag] = useDrag({
		type: TYPE,
		item: { index },
	});

	const [, drop] = useDrop({
		accept: TYPE,
		hover: (item: { index: number }): void => {
			if (item.index !== index) {
				move(item.index, index);

				item.index = index;
			}
		},
	});

	return (
		<div
			ref={(node: HTMLDivElement | null): void => {
				if (node) {
					drag(drop(node));
				}
			}}
		>
			{children}
		</div>
	);
}
