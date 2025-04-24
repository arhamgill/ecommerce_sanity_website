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
  const isZer0 = getItemQuantity(product._id) === 0;
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing on the server side
  }

  return (
    <div className="flex items-center gap-4 mt-4">
      <button
        onClick={() => removeItem(product._id)}
        disabled={disabled || isZer0}
        className="p-4 flex items-center justify-center h-4 w-4 rounded-full bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
      >
        -
      </button>
      <span>{getItemQuantity(product._id)}</span>
      <button
        onClick={() => addItem(product)}
        disabled={disabled}
        className="p-4 flex items-center justify-center h-4 w-4 rounded-full bg-gray-300 cursor-pointer "
      >
        +
      </button>
    </div>
  );
}

export default AddToBasketButton;
