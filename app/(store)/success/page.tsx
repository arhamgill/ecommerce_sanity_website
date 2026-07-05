"use client";
import React, { useEffect, useState } from "react";
import { useBasketStore } from "@/store/store";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function Page() {
  const searchParams = useSearchParams();
  const { clearBasket } = useBasketStore();
  const orderNumber = searchParams.get("orderNumber");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (orderNumber) clearBasket();
    // Trigger animation after mount
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [orderNumber, clearBasket]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div
        className={`max-w-md w-full text-center transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Animated checkmark */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-24 h-24">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
            <div className="absolute inset-0 rounded-full bg-green-50 border-4 border-green-200 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                  style={{
                    strokeDasharray: 30,
                    strokeDashoffset: visible ? 0 : 30,
                    transition: "stroke-dashoffset 0.7s ease 0.3s",
                  }}
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs text-green-600 font-bold uppercase tracking-widest mb-2">
            Payment Successful
          </p>
          <h1
            className="text-4xl font-black text-slate-900 mb-3"
            style={{ letterSpacing: "-0.04em" }}
          >
            Order Confirmed! 🎉
          </h1>
          <p className="text-slate-500 leading-relaxed">
            Thank you for your purchase. We&apos;re preparing your order and will
            send you an update once it ships.
          </p>
        </div>

        {orderNumber && (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1">
              Order Number
            </p>
            <p className="text-lg font-black text-slate-800 font-mono tracking-wide">
              #{orderNumber.slice(0, 8).toUpperCase()}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/orders" className="btn btn-primary px-8 py-3 text-base w-full sm:w-auto">
            View My Orders
          </Link>
          <Link href="/" className="btn btn-outline px-8 py-3 text-base w-full sm:w-auto">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
