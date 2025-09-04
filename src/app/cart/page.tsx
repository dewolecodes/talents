"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FiTrash2 } from "react-icons/fi";

export default function CartPage() {
	const { items, removeItem, clear } = useCart();
	const [confirmOpen, setConfirmOpen] = useState(false);

	function handleClear() {
		setConfirmOpen(true);
	}

	function cancel() {
		setConfirmOpen(false);
	}

	function confirmClear() {
		clear();
		setConfirmOpen(false);
	}

	return (
		<div className="max-w-4xl mx-auto px-6 py-8">
			<h1 className="text-2xl font-bold mb-4">Your Cart</h1>

			{items.length === 0 ? (
				<div className="text-white/70">Your cart is empty.</div>
			) : (
				<div className="space-y-4">
					{items.map((it) => (
						<div key={it.id} className="flex items-center gap-4 bg-white/5 p-4 rounded-md">
							{it.image && <img src={it.image} alt={it.title} className="w-16 h-16 object-cover rounded" />}
							<div className="flex-1">
								<div className="font-semibold text-white">{it.title}</div>
								<div className="text-sm text-white/70">{it.price} · Qty: {it.quantity}</div>
							</div>
							<div className="flex items-center gap-2">
								<button onClick={() => removeItem(it.id)} className="p-2 rounded bg-white/6 text-white">
									<FiTrash2 />
								</button>
							</div>
						</div>
					))}

					<div className="flex justify-end gap-2">
						<button onClick={handleClear} className="px-4 py-2 rounded bg-[var(--color3)] text-[var(--color2)]">Clear Cart</button>
					</div>
				</div>
			)}

			{/* Confirmation modal */}
			{confirmOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div className="absolute inset-0 bg-black/50" onClick={cancel} />
					<div className="relative bg-[#0b0b0b] rounded-md p-6 max-w-md w-full mx-4">
						<h3 className="text-lg font-bold mb-2">Are you sure?</h3>
						<p className="text-sm text-white/70 mb-4">Are you sure you want to clear all cart items?</p>
						<div className="flex justify-end gap-3">
							  <button onClick={confirmClear} className="px-4 py-2 rounded bg-[var(--color3)] text-[var(--color2)]">Yes</button>
							  <button onClick={cancel} className="px-4 py-2 rounded bg-white/6">No</button>
							  <button onClick={cancel} className="px-4 py-2 rounded bg-white/6">Cancel</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
