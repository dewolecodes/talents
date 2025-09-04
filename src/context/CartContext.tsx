"use client";

import React, { createContext, useContext, useState } from "react";

export type CartItem = {
	id: string;
	title: string;
	price: string;
	quantity?: number;
	image?: string;
};

type CartContextType = {
	items: CartItem[];
	addItem: (item: CartItem) => void;
	removeItem: (id: string) => void;
	clear: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error("useCart must be used within CartProvider");
	return ctx;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [items, setItems] = useState<CartItem[]>([]);

	function addItem(item: CartItem) {
		setItems((prev) => {
			const found = prev.find((p) => p.id === item.id);
			if (found) {
				return prev.map((p) => (p.id === item.id ? { ...p, quantity: (p.quantity || 1) + (item.quantity || 1) } : p));
			}
			return [...prev, { ...item, quantity: item.quantity ?? 1 }];
		});
	}

	function removeItem(id: string) {
		setItems((prev) => prev.filter((p) => p.id !== id));
	}

	function clear() {
		setItems([]);
	}

	return <CartContext.Provider value={{ items, addItem, removeItem, clear }}>{children}</CartContext.Provider>;
};

export default CartContext;
