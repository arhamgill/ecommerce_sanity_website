"use client";
import { Product } from "@/sanity.types";
import React from "react";
import ProductThumbnail from "./ProductThumbnail";
import { AnimatePresence, motion } from "framer-motion";

function ProductsGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-bold text-slate-700 mb-2">No products found</h3>
        <p className="text-slate-400 text-sm">Try a different category or search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, i) => (
        <AnimatePresence key={product._id}>
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
          >
            <ProductThumbnail product={product} />
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
}

export default ProductsGrid;
