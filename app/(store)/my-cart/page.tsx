"use client";

import { useBasketStore } from "@/store/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddToBasketButton from "@/components/AddToBasketButton";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";

function page() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  console.log("groupedItems", groupedItems);

  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

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
      {groupedItems.map((item) => (
        <div
          key={item.product._id}
          className="flex justify-between border p-3 max-w-2xl mx-auto"
        >
          <div
            className="flex flex-col lg:flex-row gap-4 items-center cursor-pointer"
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
                  (item.product.price ? item.product.price : 0) * item.quantity
                ).toFixed(2)}
              </p>
            </div>
          </div>
          <AddToBasketButton product={item.product} disabled={false} />
        </div>
      ))}
    </div>
  );
}

export default page;
