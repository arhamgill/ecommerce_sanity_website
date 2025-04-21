import React from "react";
import { getActiveSaleByCode } from "@/sanity/lib/sales/getActiveSaleByCode";
async function BlackFridayBanner() {
  const sale = await getActiveSaleByCode("BFRIDAY");
  if (!sale?.isActive) return null;
  return (
    <div className="bg-gradient-to-r from-red-600 to-black px-5 py-10 mx-5 mt-2 rounded-lg text-white shadow-lg">
      <div className="flex flex-col justify-center gap-2">
        <h2 className="text-2xl font-bold pl-2">{sale.title}</h2>
        <p className="pl-2">{sale.description}</p>
        <div className="bg-white rounded-full px-8 py-4 text-black font-bold text-lg items-center gap-2 w-fit hidden sm:flex">
          <span>
            Use Code: <span className="text-red-600">{sale.couponCode}</span>
          </span>
          <span>for {sale.discountAmount}% off</span>
        </div>
        <div className="flex sm:hidden gap-2 pl-2">
          <span>
            Use Code: <span className="underline">{sale.couponCode}</span>
          </span>
          <span>for {sale.discountAmount}% off</span>
        </div>
      </div>
    </div>
  );
}

export default BlackFridayBanner;
