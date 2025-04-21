import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByName = async (searchString:string) => {
  const products_by_name_query = defineQuery(`
    *[_type == "product" && name match $searchString] | order(name asc)`)
    try {
    const products = await sanityFetch({query: products_by_name_query,
        params: { searchString: `${searchString}*` },
    });
    return products.data || []
} catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}


