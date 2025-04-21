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
    <div className="flex flex-col items-center justify-top min-h-screen py-2">
      <div>
        <CategorySelector categories={categories} />
      </div>
      <div>
        <ProductsGrid products={products} />
      </div>
    </div>
  );
}

export default ProductsView;
