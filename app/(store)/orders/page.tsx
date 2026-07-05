import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAllOrders } from "@/sanity/lib/orders/getAllOrders";
import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

function StatusBadge({ status }: { status: string }) {
  const map: Record<OrderStatus, string> = {
    pending:    "badge-pending",
    processing: "badge-processing",
    shipped:    "badge-shipped",
    delivered:  "badge-delivered",
    cancelled:  "badge-cancelled",
  };
  const iconMap: Record<OrderStatus, string> = {
    pending:    "⏳",
    processing: "⚙️",
    shipped:    "🚚",
    delivered:  "✅",
    cancelled:  "❌",
  };
  const cls = map[status as OrderStatus] ?? "badge-pending";
  const icon = iconMap[status as OrderStatus] ?? "📦";

  return (
    <span className={`badge ${cls}`}>
      <span>{icon}</span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function formatDate(dateStr: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default async function OrdersPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const ordersResult = await getAllOrders(userId);
  // getAllOrders returns { data: Order[] } because of sanityFetch
  const orders = (ordersResult as { data?: unknown[] })?.data ?? [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="text-3xl sm:text-4xl font-black text-slate-900"
          style={{ letterSpacing: "-0.04em" }}
        >
          My Orders
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          {orders.length > 0
            ? `You have ${orders.length} order${orders.length !== 1 ? "s" : ""}`
            : "You haven't placed any orders yet"}
        </p>
      </div>

      {orders.length === 0 ? (
        /* Empty state */
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 sm:p-20 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center mb-5">
            <svg
              className="w-10 h-10 text-indigo-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">No orders yet</h2>
          <p className="text-slate-400 text-sm max-w-xs mb-8">
            When you place your first order, it will appear here so you can
            track everything in one place.
          </p>
          <Link href="/" className="btn btn-primary px-8 py-3 text-base">
            Start Shopping
          </Link>
        </div>
      ) : (
        /* Orders list */
        <div className="space-y-6">
          {(orders as Array<Record<string, unknown>>).map((order) => {
            const products = (order.products as Array<Record<string, unknown>>) ?? [];
            const orderNumber = order.orderNumber as string;
            const totalPrice = order.totalPrice as number;
            const discountAmount = order.discountAmount as number;
            const orderStatus = (order.orderStatus as string) ?? "pending";
            const createdAt = order._createdAt as string;
            const email = order.email as string;

            return (
              <div
                key={orderNumber}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Order header */}
                <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-50">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-0.5">
                        Order
                      </p>
                      <p className="text-sm font-bold text-slate-800 font-mono">
                        #{orderNumber?.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-slate-100" />
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-0.5">
                        Date
                      </p>
                      <p className="text-sm text-slate-700 font-medium">
                        {createdAt ? formatDate(createdAt) : "—"}
                      </p>
                    </div>
                    {email && (
                      <>
                        <div className="hidden sm:block w-px h-8 bg-slate-100" />
                        <div>
                          <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-0.5">
                            Email
                          </p>
                          <p className="text-sm text-slate-700 font-medium truncate max-w-[180px]">
                            {email}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <StatusBadge status={orderStatus} />
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total</p>
                      <p className="text-lg font-black text-gradient">
                        ${(totalPrice ?? 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Products */}
                {products.length > 0 && (
                  <div className="p-5 sm:p-6">
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-4">
                      {products.length} {products.length === 1 ? "Item" : "Items"}
                    </p>
                    <div className="space-y-3">
                      {products.map((item, idx) => {
                        const productData = item.name as Record<string, unknown> | null;
                        const productName = productData?.name as string | undefined;
                        const productImage = productData?.image as Record<string, unknown> | null;
                        const productPrice = productData?.price as number | undefined;
                        const quantity = item.quantity as number;
                        const key = item._key as string ?? idx;

                        return (
                          <div
                            key={key}
                            className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100"
                          >
                            {/* Product image */}
                            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white border border-slate-100 shrink-0">
                              {productImage ? (
                                <Image
                                  src={imageUrl(productImage).url()}
                                  alt={productName ?? "Product"}
                                  fill
                                  className="object-cover"
                                  sizes="56px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-200">
                                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-800 text-sm truncate">
                                {productName ?? "Unknown Product"}
                              </p>
                              {productPrice && (
                                <p className="text-xs text-slate-400 mt-0.5">
                                  ${productPrice.toFixed(2)} each
                                </p>
                              )}
                            </div>

                            {/* Quantity + subtotal */}
                            <div className="text-right shrink-0">
                              <p className="text-xs text-slate-400">Qty: {quantity}</p>
                              {productPrice && (
                                <p className="text-sm font-bold text-slate-700">
                                  ${(productPrice * quantity).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Discount */}
                    {discountAmount > 0 && (
                      <div className="mt-4 flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                        <span className="text-sm text-green-700 font-medium flex items-center gap-1.5">
                          <span>🎉</span> Discount Applied
                        </span>
                        <span className="text-sm font-bold text-green-700">
                          −${discountAmount.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
