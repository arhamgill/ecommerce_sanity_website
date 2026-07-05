"use client";
import { Category } from "@/sanity.types";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

function CategorySelector({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState<string | null>(null);

  // Detect active category from URL
  React.useEffect(() => {
    const match = pathname.match(/\/category\/([^/]+)/);
    if (match) setSelected(match[1]);
    else setSelected(null);
  }, [pathname]);

  const handleSelect = (slug: string | null) => {
    setSelected(slug);
    if (slug) router.push(`/category/${slug}`);
    else router.push("/");
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {/* "All" pill */}
      <button
        onClick={() => handleSelect(null)}
        className={`btn text-sm transition-all duration-200 ${
          selected === null
            ? "btn-primary shadow-md"
            : "btn-ghost border border-slate-200 text-slate-600 hover:border-indigo-300"
        }`}
        style={{ padding: "0.375rem 1rem" }}
      >
        All Products
      </button>

      {categories.map((category) => {
        const slug = category.slug?.current ?? "";
        const isActive = selected === slug;
        return (
          <button
            key={category._id}
            onClick={() => handleSelect(slug)}
            className={`btn text-sm transition-all duration-200 ${
              isActive
                ? "btn-primary shadow-md"
                : "btn-ghost border border-slate-200 text-slate-600 hover:border-indigo-300"
            }`}
            style={{ padding: "0.375rem 1rem" }}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
}

export default CategorySelector;
