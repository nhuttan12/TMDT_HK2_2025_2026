import { CartItem } from '@/types/carts/CartItem';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	removeItem: (id: number) => void;
	clearItems: () => void;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set) => ({
			items: [],
			addItem: (item) => {
				set((state) => {
					const existing = state.items.find(
						(i: CartItem) => i.productID === item.productID,
					);

					if (existing) {
						return {
							items: state.items.map((i: CartItem) =>
								i.productID === item.productID
									? { ...i, quantity: i.quantity + item.quantity }
									: i,
							),
						};
					}

					return {
						items: [...state.items, item],
					};
				});
			},
			removeItem: (productID) => {
				return set((state) => ({
					items: state.items.filter((i) => i.productID !== productID),
				}));
			},
			clearItems: () => set({ items: [] }),
		}),
		{
			name: 'cart-storage',
		},
	),
);
