import { Product, Category } from "@/sanity.types";
import React from "react";
import ProductsGrid from "./ProductsGrid";
import CategorySelector from "./CategorySelector";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

function ProductsView({ products, categories }: ProductsViewProps) {
  return (
    <div className="space-y-8">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="section-title section-title-underline">
            Featured Products
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            {products.length} {products.length === 1 ? "product" : "products"} available
          </p>
        </div>
        <CategorySelector categories={categories} />
      </div>

      <div className="divider" />

      {/* Grid */}
      <ProductsGrid products={products} />
    </div>
  );
}

export default ProductsView;
