import {
	Box,
	Droplet,
	Flower2,
	Hammer,
	Lamp,
	Leaf,
	Mountain,
	Package,
	Scissors,
	Sprout,
	HelpCircle,
} from 'lucide-react';

// Bảng ánh xạ (Mapping Dictionary) từ chuỗi string sang Component Icon
const ICON_MAP: Record<string, React.ReactNode> = {
	Box: <Box className='w-6 h-6' />,
	Flower2: <Flower2 className='w-6 h-6' />,
	Sprout: <Sprout className='w-6 h-6' />,
	Leaf: <Leaf className='w-6 h-6' />,
	Mountain: <Mountain className='w-6 h-6' />,
	Lamp: <Lamp className='w-6 h-6' />,
	Scissors: <Scissors className='w-6 h-6' />,
	Droplet: <Droplet className='w-6 h-6' />,
	Package: <Package className='w-6 h-6' />,
	Hammer: <Hammer className='w-6 h-6' />,
};

export const renderIcon = (iconName: string): React.ReactNode => {
	return ICON_MAP[iconName] || <HelpCircle className='w-6 h-6' />;
};