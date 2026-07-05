import React from "react";
import { getProductsByName } from "@/sanity/lib/products/getProductsByName";
import ProductsGrid from "@/components/ProductsGrid";
import Link from "next/link";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const products = await getProductsByName(query);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Heading */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-600 font-medium">Search</span>
        </nav>
        <h1 className="text-3xl font-black text-slate-900" style={{ letterSpacing: "-0.04em" }}>
          {products.length > 0 ? (
            <>
              Results for{" "}
              <span className="text-gradient">&quot;{query}&quot;</span>
            </>
          ) : (
            <>No results found</>
          )}
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          {products.length > 0
            ? `${products.length} product${products.length !== 1 ? "s" : ""} found`
            : `No products match "${query}". Try a different keyword.`}
        </p>
      </div>

      <div className="divider" />

      <div className="mt-8">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">Nothing found</h2>
            <p className="text-slate-400 text-sm mb-8 max-w-xs">
              We couldn&apos;t find anything for &quot;{query}&quot;. Try different keywords or browse all products.
            </p>
            <Link href="/" className="btn btn-primary px-8 py-3">
              Browse All Products
            </Link>
          </div>
        ) : (
          <ProductsGrid products={products} />
        )}
      </div>
    </div>
  );
}

export default SearchPage;
