import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  const products_query = defineQuery(`
    *[_type == "product"]
    | order(name asc)`)
    try {
    const products = await sanityFetch({query: products_query});
    return products.data || []
} catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}


