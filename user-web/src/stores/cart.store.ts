import { CartItem } from '@/types/carts/CartItem';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
	items: CartItem[];
	addToCart: (item: CartItem) => void;
	removeItem: (id: number) => void;
	clearItems: () => void;
	updateQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set) => ({
			items: [],
			addToCart: (item: CartItem) => {
				set((state: CartStore) => {
					const existing: CartItem | undefined = state.items.find(
						(i: CartItem): boolean => i.productID === item.productID,
					);

					if (existing) {
						return {
							items: state.items.map(
								(i: CartItem): CartItem =>
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
			removeItem: (productID: number): void => {
				set((state: CartStore) => ({
					items: state.items.filter((i: CartItem): boolean => i.productID !== productID),
				}));
			},
			clearItems: (): void => set({ items: [] }),
			updateQuantity: (productID: number, quantity: number): void =>
				set((state: CartStore) => {
					if (quantity < 1) {
						return {
							items: state.items.filter(
								(i: CartItem): boolean => i.productID !== productID,
							),
						};
					}

					return {
						items: state.items.map(
							(i: CartItem): CartItem =>
								i.productID === productID ? { ...i, quantity } : i,
						),
					};
				}),
		}),
		{
			name: 'cart-storage',
		},
	),
);
