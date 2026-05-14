import React, { JSX } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Props {
	id: string;
	disabled?: boolean;
	children: React.ReactNode;
}

export function SortableImageItem({ id, disabled, children }: Props): JSX.Element {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id,
		disabled,
	});

	// CSS transform là cốt lõi của dnd-kit giúp animation mượt mà ở 60fps
	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.4 : 1,
		zIndex: isDragging ? 10 : 1, // Nổi lên trên các item khác khi đang kéo
		position: 'relative',
		touchAction: 'none', // Sửa lỗi không kéo được trên thiết bị di động (rất quan trọng)
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners} // Toàn bộ div này có thể nắm để kéo
			className={`touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${disabled ? 'cursor-default' : ''}`}
		>
			{children}
		</div>
	);
}
