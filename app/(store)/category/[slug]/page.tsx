import React from "react";
import { getProductsByCategory } from "@/sanity/lib/categories/getProductsByCategory";
import ProductsGrid from "@/components/ProductsGrid";
async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);
  if (products.length === 0) {
    return (
      <div className="text-center mt-5">
        No products found for category "{slug}"
      </div>
    );
  }

  return <ProductsGrid products={products} />;
}

export default page;
