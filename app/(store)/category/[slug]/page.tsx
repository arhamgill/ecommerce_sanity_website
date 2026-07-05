import React from "react";
import { getProductsByCategory } from "@/sanity/lib/categories/getProductsByCategory";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import ProductsGrid from "@/components/ProductsGrid";
import Link from "next/link";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [products, categories] = await Promise.all([
    getProductsByCategory(slug),
    getAllCategories(),
  ]);

  const category = categories.find((c) => c.slug?.current === slug);
  const categoryName = category?.title ?? slug;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-600 font-medium">{categoryName}</span>
        </nav>
        <h1 className="text-3xl font-black text-slate-900" style={{ letterSpacing: "-0.04em" }}>
          {categoryName}
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          {products.length > 0
            ? `${products.length} product${products.length !== 1 ? "s" : ""} in this category`
            : "No products in this category yet."}
        </p>
      </div>

      <div className="divider" />

      <div className="mt-8">
        <ProductsGrid products={products} />
      </div>
    </div>
  );
}

export default page;
