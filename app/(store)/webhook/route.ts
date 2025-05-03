import { stripeClient } from "@/lib/stripe";
import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { MetaData } from "@/actions/createCheckoutSession";

export async function POST(request: NextRequest) {
    const headersList = await headers();
    const stripeSignature = headersList.get("stripe-signature");
    if (!stripeSignature) {
        return NextResponse.json({ error: "Missing Stripe-Signature header" }, { status: 400 });
    }
    const body = await request.text();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        return NextResponse.json({ error: "Missing webhook secret" }, { status: 500 });
    }
    
    let event: Stripe.Event;
    
    try {
        event = stripeClient.webhooks.constructEvent(
        body,
        stripeSignature,
        webhookSecret
        );
    } catch (err) {
        console.log("Error constructing webhook event:", err);
        return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
    }
    
   if(event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        try {
            const order = await createOrder(session);
            console.log("Order created:", order);
        } catch (error) {
            console.error("Error creating order:", error);
            return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
            
        }
    }
    
    return NextResponse.json({ received: true }, { status: 200 });

}

async function createOrder(session: Stripe.Checkout.Session) {
    const { id, amount_total, metadata, total_details, currency, payment_intent, customer } = session;
    const { customerEmail, customerFullName, orderNumber, clerkUserId } = metadata as MetaData;
 
    const lineItems = await stripeClient.checkout.sessions.listLineItems(id, {
        expand: ["data.price.product"],
    })

    const sanityItems = lineItems.data.map((item) => ({
        _key: crypto.randomUUID(),
        name: {
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product).metadata.productId,
        },
        quantity: item.quantity || 0,
    }));

    
    const order = await backendClient.create({
        _type: "order",
        orderNumber,
        stripeCheckoutOrderId: id,
        stripeCustomerId: customer,
        clerkUserId,
        customerName: customerFullName,
        email: customerEmail,
        stripePaymentIntentId: payment_intent,
        totalPrice: amount_total? amount_total / 100: 0,
        orderStatus: "pending",
        products: sanityItems,
        discountAmount: total_details?.amount_discount || 0,
        
    })

    return order;
 
}