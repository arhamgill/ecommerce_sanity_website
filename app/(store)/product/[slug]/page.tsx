import React from "react";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import AddToBasketButton from "@/components/AddToBasketButton";
import { Product } from "@/sanity.types";
import Link from "next/link";

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product: Product | null = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-7xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Product not found</h1>
        <p className="text-slate-500 mb-6">This product may have been removed or the link is invalid.</p>
        <Link href="/" className="btn btn-primary px-6 py-3">
          Back to Shop
        </Link>
      </div>
    );
  }

  const outOfStock = product.stock != null && product.stock <= 0;
  const inStock = !outOfStock;
  const lowStock = product.stock != null && product.stock > 0 && product.stock <= 5;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-700 font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
        {/* Image */}
        <div className="group relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-md aspect-square">
          {product.image ? (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name || "Product"}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-200">
              <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <span className="bg-white text-slate-800 font-bold px-6 py-3 rounded-full shadow-lg text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          {/* Category tag */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`badge text-xs ${inStock ? "badge-delivered" : "badge-cancelled"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
            {lowStock && (
              <span className="badge badge-pending text-xs">
                Only {product.stock} left!
              </span>
            )}
          </div>

          <h1
            className="text-3xl sm:text-4xl font-black text-slate-900 mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-end gap-2 mb-5">
            <span className="text-4xl font-black text-gradient">
              ${product.price?.toFixed(2)}
            </span>
            {product.currency && (
              <span className="text-slate-400 text-sm mb-1 font-medium">{product.currency}</span>
            )}
          </div>

          {/* Divider */}
          <div className="divider" />

          {/* Description */}
          {product.description && (
            <p className="text-slate-500 leading-relaxed mb-6 text-base">
              {product.description}
            </p>
          )}

          {/* Add to basket */}
          <AddToBasketButton disabled={outOfStock} product={product} />

          {/* Perks */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: "🚚", text: "Free Shipping" },
              { icon: "🔒", text: "Secure Checkout" },
              { icon: "🔄", text: "Easy Returns" },
            ].map((p) => (
              <div
                key={p.text}
                className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100"
              >
                <span className="text-xl">{p.icon}</span>
                <span className="text-xs font-semibold text-slate-600">{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
