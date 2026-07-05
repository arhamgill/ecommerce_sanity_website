import { getAllProducts } from "@/sanity/lib/products/getAllLLProducts";
import { getAllCategories } from "@/sanity/lib/categories/getAllCategories";
import ProductsView from "@/components/ProductsView";
import BlackFridayBanner from "@/components/BlackFridayBanner";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-hero-gradient relative overflow-hidden">
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #818cf8 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
              New arrivals every week
            </div>
            <h1
              className="text-5xl sm:text-6xl font-black text-gradient mb-5"
              style={{ letterSpacing: "-0.04em" }}
            >
              Shop with
              <br />
              confidence.
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
              Discover curated premium products handpicked for quality, style,
              and value. Free shipping on orders over $50.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#products" className="btn btn-primary px-6 py-3 text-base">
                Browse Products
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="/orders" className="btn btn-outline px-6 py-3 text-base">
                My Orders
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-indigo-100/60">
              {[
                { icon: "🚚", label: "Free Shipping", sub: "On orders $50+" },
                { icon: "🔄", label: "Easy Returns", sub: "30-day policy" },
                { icon: "🔒", label: "Secure Checkout", sub: "Powered by Stripe" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-slate-700">{item.label}</div>
                    <div className="text-xs text-slate-400">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sale Banner */}
      <BlackFridayBanner />

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductsView products={products} categories={categories} />
      </section>
    </>
  );
}
