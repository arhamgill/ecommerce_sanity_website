"use client";
import { Product } from "@/sanity.types";
import { useEffect, useState } from "react";
import { useBasketStore } from "@/store/store";

function AddToBasketButton({
  product,
  disabled,
}: {
  product: Product;
  disabled: boolean;
}) {
  const [isClient, setIsClient] = useState(false);
  const { addItem, removeItem, getItemQuantity } = useBasketStore();
  const quantity = getItemQuantity(product._id);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (disabled) {
    return (
      <button
        disabled
        className="mt-6 w-full py-3 px-6 rounded-full bg-slate-100 text-slate-400 font-semibold cursor-not-allowed text-sm"
      >
        Out of Stock
      </button>
    );
  }

  if (quantity === 0) {
    return (
      <button
        onClick={() => addItem(product)}
        className="btn btn-primary mt-6 w-full py-3 text-base"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Add to Cart
      </button>
    );
  }

  return (
    <div className="mt-6 flex items-center gap-4">
      <div className="flex items-center bg-slate-100 rounded-full overflow-hidden">
        <button
          onClick={() => removeItem(product._id)}
          className="w-11 h-11 flex items-center justify-center text-slate-600 hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-200 text-lg font-bold"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-10 text-center font-bold text-slate-800 text-lg select-none">
          {quantity}
        </span>
        <button
          onClick={() => addItem(product)}
          className="w-11 h-11 flex items-center justify-center text-slate-600 hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-200 text-lg font-bold"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <span className="text-sm text-slate-500 font-medium">{quantity} in cart</span>
    </div>
  );
}

export default AddToBasketButton;
