import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { imageUrl } from "@/lib/imageUrl";

function ProductThumbnail({ product }: { product: Product }) {
  const outOfStock = product.stock != null && product.stock <= 0;

  return (
    <Link
      href={`/products/${product.slug?.current}`}
      className={`${outOfStock ? "opacity-50" : ""}group relative block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out`}
    >
      <div className="relative h-64 w-full overflow-hidden rounded-lg">
        {product.image && (
          <Image
            src={imageUrl(product.image).url()}
            alt={product.name || ""}
            width={500}
            height={500}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        )}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-500/50 text-white text-lg font-bold">
            Out of Stock
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="mt-2 text-lg font-semibold text-gray-900">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-700">{product.description}</p>
        <p className="mt-1 text-lg font-bold text-gray-900">${product.price}</p>
      </div>
    </Link>
  );
}

export default ProductThumbnail;
