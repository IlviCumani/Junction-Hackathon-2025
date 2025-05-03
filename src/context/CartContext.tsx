import { createContext, useContext, useEffect, useState } from "react";
import StorageManager from "@/models/StorageManager";

const CART_STORAGE_KEY = "cartItems";

type CartItem = {
	id: number;
	name: string;
	price: number;
	quantity: number;
	image: string;
};

type CardProviderState = {
	cartItems: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: number) => void;
	updateQuantity: (id: number, quantity: number) => void;
	clearCart: () => void;
};

const CartContext = createContext<CardProviderState | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	useEffect(() => {
		const storedCartItems = StorageManager.getItem(CART_STORAGE_KEY);
		if (storedCartItems) {
			setCartItems(storedCartItems);
		}
	}, []);

	const addToCart = (item: CartItem) => {
		setCartItems((prevItems) => {
			const existingItem = prevItems.find((i) => i.id === item.id);
			if (existingItem) {
				const updatedItems = prevItems.map((i) =>
					i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
				);
				StorageManager.setItem(CART_STORAGE_KEY, updatedItems);
				return updatedItems;
			}

			const newItems = [...prevItems, item];
			StorageManager.setItem(CART_STORAGE_KEY, newItems);
			return newItems;
		});
	};

	const removeFromCart = (id: number) => {
		setCartItems((prevItems) => {
			const items = prevItems.filter((item) => item.id !== id);
			StorageManager.setItem(CART_STORAGE_KEY, items);
			return items;
		});
	};

	const updateQuantity = (id: number, quantity: number) => {
		setCartItems((prevItems) => {
			const updatedItems = prevItems.map((item) =>
				item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item,
			);

			// if (quantity === 0) {
			// 	StorageManager.setItem(
			// 		CART_STORAGE_KEY,
			// 		updatedItems.filter((item) => item.id !== id),
			// 	);
			// 	return updatedItems.filter((item) => item.id !== id);
			// }

			StorageManager.setItem(CART_STORAGE_KEY, updatedItems);
			return updatedItems;
		});
	};

	const clearCart = () => {
		setCartItems([]);
		StorageManager.removeItem(CART_STORAGE_KEY);
	};

	return (
		<CartContext.Provider
			value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCartContext() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
