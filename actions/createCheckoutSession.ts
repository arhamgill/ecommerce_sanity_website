"use server";
import { imageUrl } from "@/lib/imageUrl";
import { stripeClient } from "@/lib/stripe";
import { BasketItem } from "@/store/store";

export type MetaData = {
    customerEmail: string;
    clerkUserId: string;
    customerFullName: string;
    orderNumber: string;
}

export type GroupedBasketItem= {
    product: BasketItem["product"];
    quantity: number;
}

export async function createCheckoutSession(items: GroupedBasketItem[], metaData: MetaData) {

    try {

        const itemsWithoutPrice = items.filter(item => !item.product.price);
        if (itemsWithoutPrice.length > 0) {
            throw new Error("Some items do not have a price set.");
        }

        const customers = await stripeClient.customers.list({
            email: metaData.customerEmail,
            limit: 1,
        });
        let customerId: string | undefined;

        if(customers.data.length > 0) {
            customerId = customers.data[0].id;
        }
        
        const session = await stripeClient.checkout.sessions.create({
            customer: customerId,
            customer_creation: customerId? undefined : "always",
            customer_email: customerId? undefined : metaData.customerEmail,
            metadata: metaData,
            mode: "payment",
            allow_promotion_codes: true,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metaData.orderNumber}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/my-cart`,
            line_items: items.map(item => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.product.name || "Unnamed Product",
                        images: item.product.image ? [imageUrl(item.product.image).url()] : [],
                        description: item.product.description || "No description available",
                        metadata: {
                            productId: item.product._id
                        }


                    },
                    unit_amount: item.product.price! * 100,
                },
                quantity: item.quantity,
            })),


        })

        return session.url;
        

    } catch (error) {
        console.error("Error creating checkout session:", error);
        throw new Error("Failed to create checkout session");
        
    }
}
