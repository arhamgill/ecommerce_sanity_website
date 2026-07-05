"use client";

import { useBasketStore } from "@/store/store";
import { useAuth, useUser, SignInButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddToBasketButton from "@/components/AddToBasketButton";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import Link from "next/link";
import {
  MetaData,
  createCheckoutSession,
} from "@/actions/createCheckoutSession";

function Page() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const totalItems = useBasketStore((state) => state.getItemsCount());
  const totalPrice = useBasketStore((state) => state.getTotalPrice());

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);
    try {
      const metaData: MetaData = {
        orderNumber: crypto.randomUUID(),
        customerFullName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user?.id ?? "Unknown",
      };
      const checkoutUrl = await createCheckoutSession(groupedItems, metaData);
      if (checkoutUrl) window.location.href = checkoutUrl;
    } catch (error) {
      console.log("Error during checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (groupedItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2" style={{ letterSpacing: "-0.03em" }}>
            Your cart is empty
          </h2>
          <p className="text-slate-400 text-sm mb-8 max-w-xs">
            Looks like you haven&apos;t added anything yet. Explore our collection!
          </p>
          <Link href="/" className="btn btn-primary px-8 py-3 text-base">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900" style={{ letterSpacing: "-0.03em" }}>
          My Cart
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Cart Items */}
        <div className="flex-1 space-y-4 min-w-0">
          {groupedItems.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
            >
              {/* Image */}
              <div
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0 cursor-pointer"
                onClick={() => router.push(`/product/${item.product.slug?.current}`)}
              >
                {item.product.image ? (
                  <Image
                    src={imageUrl(item.product.image ?? {}).url()}
                    alt={item.product.name || "Product"}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h2
                  className="font-semibold text-slate-800 text-sm sm:text-base truncate cursor-pointer hover:text-indigo-600 transition-colors"
                  onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                >
                  {item.product.name}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  ${item.product.price?.toFixed(2)} each
                </p>
                <p className="text-sm font-bold text-indigo-600 mt-1">
                  ${((item.product.price ?? 0) * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Quantity */}
              <div className="shrink-0">
                <AddToBasketButton product={item.product} disabled={false} />
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-slate-900 mb-5">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">
                  {totalPrice >= 50 ? "Free" : "$4.99"}
                </span>
              </div>
            </div>

            <div className="divider" />

            <div className="flex justify-between items-center mb-6">
              <span className="text-base font-bold text-slate-900">Total</span>
              <span className="text-xl font-black text-gradient">
                ${(totalPrice < 50 ? totalPrice + 4.99 : totalPrice).toFixed(2)}
              </span>
            </div>

            {totalPrice < 50 && (
              <p className="text-xs text-amber-600 bg-amber-50 rounded-xl p-3 mb-4 font-medium">
                🚚 Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
              </p>
            )}

            {isSignedIn ? (
              <button
                className="btn btn-primary w-full py-3.5 text-base"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Processing…
                  </span>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure Checkout
                  </>
                )}
              </button>
            ) : (
              <SignInButton mode="modal">
                <button className="btn btn-primary w-full py-3.5 text-base">
                  Sign in to Checkout
                </button>
              </SignInButton>
            )}

            <Link
              href="/"
              className="block text-center text-sm text-slate-400 hover:text-indigo-600 mt-4 transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
