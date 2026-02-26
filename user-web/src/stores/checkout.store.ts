import { create } from 'zustand';
import { CartItem } from '@/types/carts/CartItem';

interface CheckoutState {
	items: CartItem[];
	setItems: (items: CartItem[]) => void;
	clearItems: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
	items: [],
	setItems: (items: CartItem[]) => set({ items }),
	clearItems: () => set({ items: [] }),
}));
