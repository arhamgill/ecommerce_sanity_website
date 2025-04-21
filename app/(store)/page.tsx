import { getAllProducts } from "@/sanity/lib/products/getAllLLProducts";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import ProductsView from "@/components/ProductsView";
import BlackFridayBanner from "@/components/BlackFridayBanner";
export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  // console.log("products", products);
  // console.log("categories", categories);
  return (
    <>
      <BlackFridayBanner />
      <div className="flex flex-col items-center justify-top min-h-screen py-2">
        <ProductsView products={products} categories={categories} />
      </div>
    </>
  );
}
