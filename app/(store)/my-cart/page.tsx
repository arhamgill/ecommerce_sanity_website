"use client";

import { useBasketStore } from "@/store/store";
import { useAuth, useUser, SignInButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddToBasketButton from "@/components/AddToBasketButton";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import {
  MetaData,
  createCheckoutSession,
} from "@/actions/createCheckoutSession";

function page() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const totalItems = useBasketStore((state) => state.getItemsCount());
  const totalPrice = useBasketStore((state) => state.getTotalPrice());

  console.log("groupedItems", groupedItems);

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
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.log("Error during checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevents hydration error

  if (groupedItems.length === 0) {
    return <div className="text-center mt-5">Your cart is empty</div>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-5">My Cart</h1>
      <div className="flex flex-col gap-8 lg:flex-row px-4">
        <div className="flex flex-col gap-4">
          {groupedItems.map((item) => (
            <div
              key={item.product._id}
              className="flex justify-between border p-3 max-w-2xl lg:min-w-2xl w-full mx-auto"
            >
              <div
                className="flex flex-col lg:flex-row gap-8 cursor-pointer"
                onClick={() =>
                  router.push(`/product/${item.product.slug?.current}`)
                }
              >
                <Image
                  src={imageUrl(item.product.image ?? {}).url()}
                  alt={item.product.name || "Product Image"}
                  width={48}
                  height={48}
                  className="rounded-lg object-cover"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {item.product.name}
                  </h2>
                  <p className="text-lg font-bold text-gray-900">
                    $
                    {(
                      (item.product.price ? item.product.price : 0) *
                      item.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
              <AddToBasketButton product={item.product} disabled={false} />
            </div>
          ))}
        </div>
        <div className="bg-white fixed bottom-0 left-0 w-full h-fit order-first border rounded-md p-6 lg:sticky lg:w-80 lg:top-4 lg:left-auto lg:order-last ">
          <h1 className="text-xl font-semibold">Order Summary</h1>
          <div>
            <p className="flex justify-between mt-4 items-center">
              <span>Items:</span>
              <span>{totalItems}</span>
            </p>
            <p className="flex justify-between mt-4 items-center border-t pt-4">
              <span className="text-xl font-semibold">Total:</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </p>
          </div>
          {isSignedIn ? (
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-4 w-full cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md mt-4 w-full cursor-pointer">
                Sign in to checkout
              </button>
            </SignInButton>
          )}
        </div>

        <div className="h-64 lg:h-0"></div>
      </div>
    </div>
  );
}

export default page;
