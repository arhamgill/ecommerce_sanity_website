import React from "react";
import { getActiveSaleByCode } from "@/sanity/lib/sales/getActiveSaleByCode";

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCode("BFRIDAY");
  if (!sale?.isActive) return null;

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 my-4 rounded-2xl overflow-hidden relative animate-gradient"
      style={{
        background: "linear-gradient(135deg, #0f0523, #1e1250, #2d0a4e, #0f0523)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 6s ease infinite",
      }}
    >
      {/* Decorative stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.3}s`,
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-6 py-8 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
            🎉 Limited Time Offer
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-1" style={{ letterSpacing: "-0.03em" }}>
            {sale.title}
          </h2>
          {sale.description && (
            <p className="text-slate-300 text-sm max-w-sm">{sale.description}</p>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 shrink-0">
          <p className="text-white/60 text-xs uppercase tracking-wider font-medium">Use code at checkout</p>
          <div className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl px-6 py-3 flex items-center gap-3">
            <span className="text-2xl font-black text-white tracking-widest">
              {sale.couponCode}
            </span>
            <div className="bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
              {sale.discountAmount}% OFF
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlackFridayBanner;
