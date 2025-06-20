import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { Product } from "@/sanity.types";

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const products_query = defineQuery(`
    *[_type == "product" && slug.current == $slug]
    | order(name asc)[0]`)
    try {
    const product = await sanityFetch({query: products_query,
        params: { slug } // Pass the slug as
    });
    return product.data || null;
} catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}


