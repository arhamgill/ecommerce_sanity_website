import React from "react";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <p>Product not found</p>;
  }

  const outOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-1">
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name || "Product Image"}
              width={600}
              height={600}
              className="rounded-lg object-cover"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <p className="mt-4 text-2xl font-semibold text-gray-900">
            ${product.price}
          </p>

          {outOfStock && (
            <p className="mt-2 text-red-600 font-bold">Out of Stock</p>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              disabled={outOfStock}
            >
              Add to Cart
            </button>
            <button
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              disabled={outOfStock}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
