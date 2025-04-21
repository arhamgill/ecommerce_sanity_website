import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (slug: string) => {
  const products_by_slug_query = defineQuery(`
    *[_type == "product" && references(*[_type == "category" && slug.current == $slug]._id)]
    | order(name asc)
  `);

  try {
    const products = await sanityFetch({
      query: products_by_slug_query,
      params: { slug }, // Pass the slug as a parameter
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};