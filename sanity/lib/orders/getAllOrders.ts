import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllOrders = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required to fetch orders.");
  }

  const all_orders_query = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] {
      ...,
      products[] {
        ...,
        name-> 
      }
    }
  `);

  try {
    const orders = await sanityFetch({ query: all_orders_query, params: { userId } });
    return orders || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};


