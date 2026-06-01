import { CartItem } from '@/types/carts/CartItem';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
	items: CartItem[];
	addToCart: (item: CartItem) => void;
	removeItem: (id: string) => void;
	clearItems: () => void;
	updateQuantity: (productId: string, quantity: number) => void;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set) => ({
			items: [],
			addToCart: (item: CartItem) => {
				set((state: CartStore) => {
					const existing: CartItem | undefined = state.items.find(
						(i: CartItem): boolean => i.productId === item.productId,
					);

					if (existing) {
						return {
							items: state.items.map(
								(i: CartItem): CartItem =>
									i.productId === item.productId
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
			removeItem: (productId: string): void => {
				set((state: CartStore) => ({
					items: state.items.filter((i: CartItem): boolean => i.productId !== productId),
				}));
			},
			clearItems: (): void => set({ items: [] }),
			updateQuantity: (productId: string, quantity: number): void =>
				set((state: CartStore) => {
					if (quantity < 1) {
						return {
							items: state.items.filter(
								(i: CartItem): boolean => i.productId !== productId,
							),
						};
					}

					return {
						items: state.items.map(
							(i: CartItem): CartItem =>
								i.productId === productId ? { ...i, quantity } : i,
						),
					};
				}),
		}),
		{
			name: 'cart-storage',
		},
	),
);
