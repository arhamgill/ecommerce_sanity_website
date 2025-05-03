import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAllOrders } from "@/sanity/lib/orders/getAllOrders";

async function page() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  const orders = await getAllOrders(userId);
  console.log(orders);

  return <div>page</div>;
}

export default page;
