import { Product } from "@/sanity.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { imageUrl } from "@/lib/imageUrl";

function ProductThumbnail({ product }: { product: Product }) {
  const outOfStock = product.stock != null && product.stock <= 0;

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group block rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 ${
        outOfStock ? "opacity-65" : ""
      }`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        {product.image ? (
          <Image
            src={imageUrl(product.image).url()}
            alt={product.name || "Product"}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Out of stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
            <span className="badge badge-cancelled text-xs">Out of Stock</span>
          </div>
        )}

        {/* Hover overlay with "View" */}
        {!outOfStock && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="bg-white text-slate-800 text-xs font-semibold px-4 py-2 rounded-full shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              View Product →
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 text-sm leading-tight line-clamp-2 mb-1">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-slate-400 line-clamp-2 mb-3">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-black text-indigo-600">
            ${product.price?.toFixed(2)}
          </span>
          {product.stock != null && product.stock > 0 && product.stock <= 5 && (
            <span className="text-xs text-orange-500 font-semibold">
              Only {product.stock} left
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductThumbnail;
