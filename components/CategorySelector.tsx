"use client";
import { Category } from "@/sanity.types";
import React from "react";
import { useRouter } from "next/navigation";

function CategorySelector({ categories }: { categories: Category[] }) {
  const router = useRouter();

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedSlug = event.target.value;
    if (selectedSlug) {
      router.push(`/category/${selectedSlug}`);
    }
  };

  return (
    <div className="relative">
      <select
        defaultValue=""
        onChange={handleCategoryChange}
        className="appearance-none bg-blue-500 text-white px-4 py-2 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option value="" disabled className="text-black bg-white">
          Filter by category
        </option>
        {categories.map((category) => (
          <option
            key={category._id}
            value={category.slug?.current}
            className="text-black bg-white"
          >
            {category.title}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

export default CategorySelector;
