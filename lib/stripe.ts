import stripe from "stripe";

const apiKey = process.env.STRIPE_API_KEY as string;
export const stripeClient = new stripe(apiKey, {
  apiVersion: "2025-03-31.basil",
});