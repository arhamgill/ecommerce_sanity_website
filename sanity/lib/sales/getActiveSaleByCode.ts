import { couponCode } from "./coupon-code";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getActiveSaleByCode = async (code: couponCode) => {
    const sales_query = defineQuery(`
        *[_type == "sales" && couponCode == $code && isActive == true] 
        | order(validFrom desc)[0]
`)
try {
    const sale = await sanityFetch({
        query: sales_query,
        params: { code },
    
    });
        return sale.data || null;
} catch (error) {
    console.error("Error fetching active sale:", error);
    return null;
}


    }