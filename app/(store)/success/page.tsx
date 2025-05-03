"use client";
import React, { useEffect } from "react";
import { useBasketStore } from "@/store/store";
import { useSearchParams } from "next/navigation";

function page() {
  const searchParams = useSearchParams();
  const { clearBasket } = useBasketStore();
  const orderNumber = searchParams.get("orderNumber");

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="text-center mt-8">
      Payment Successful for order number! Plz check the confirmation email sent
      to you.
    </div>
  );
}

export default page;
