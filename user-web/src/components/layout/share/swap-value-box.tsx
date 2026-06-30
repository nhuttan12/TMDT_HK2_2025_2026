'use client';

import { Toggle } from '@/components/ui/toggle';
import { useState } from 'react';

interface SwapValueBoxProps {
	valueA: string;
	valueB: string;
	initialValue?: string;
	onChange: (selectedValue: string) => void;
}

export default function SwapValueBox({
	valueA,
	valueB,
	initialValue,
	onChange,
}: SwapValueBoxProps) {
	// Nếu initialValue trùng với valueB thì isToggled = true
	const [isToggled, setIsToggled] = useState(initialValue === valueB);

	// 2. Hàm xử lý khi người dùng nhấn vào Toggle
	const handleToggleChange = (pressed: boolean) => {
		setIsToggled(pressed); // Cập nhật giao diện
		const selectedString = pressed ? valueB : valueA;
		onChange(selectedString);
	};

	return (
		<Toggle
			pressed={isToggled}
			onPressedChange={handleToggleChange}
			variant='outline'
            className='w-32 h-10 text-sm font-semibold'
		>
			{isToggled ? valueB : valueA}
		</Toggle>
	);
}
