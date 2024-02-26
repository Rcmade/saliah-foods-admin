import CreateProductForm from "@/components/forms/create-product";
import { OrderTable } from "@/components/table/order-table";
import { getAllOrders } from "@/lib/actions/order-actions";
import React from "react";

export default async function page() {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
  //   method: "GET",
  //   cache: "no-store",
  // });
  // const data = await res.json();

  const data = await getAllOrders();
  if (data) {
    return <OrderTable data={data} />;
  } else {
    return null;
  }
}
