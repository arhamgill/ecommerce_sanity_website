import React from "react";
import { getProductsByName } from "@/sanity/lib/products/getProductsByName";
import { log } from "console";
import ProductsGrid from "@/components/ProductsGrid";
async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const { query } = await searchParams;
  const products = await getProductsByName(query);
  // console.log("Products from search page:", products);
  if (products.length === 0) {
    return (
      <div className="text-center mt-5">No products found for "{query}"</div>
    );
  }

  return <ProductsGrid products={products} />;
}

export default SearchPage;
