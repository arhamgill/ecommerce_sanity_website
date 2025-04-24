import React from "react";
import { getProductsByName } from "@/sanity/lib/products/getProductsByName";
import ProductsGrid from "@/components/ProductsGrid";
async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const products = await getProductsByName(query);
  if (products.length === 0) {
    return (
      <div className="text-center mt-5">No products found for {query}</div>
    );
  }

  return <ProductsGrid products={products} />;
}

export default SearchPage;
