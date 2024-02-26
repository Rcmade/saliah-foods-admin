import CreateProductForm from "@/components/forms/create-product";
import { getProduct } from "@/lib/actions/product-actions";
import React from "react";

interface PageProps {
  params: { page: string };
  searchParams: { [key: string]: string };
}

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;
const page = async ({ searchParams }: PageProps) => {
  if (searchParams?.type === "edit" && searchParams?._id) {
    // const res = await fetch(
    //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${searchParams?._id}`,
    //   { method: "GET", cache: "no-store" }
    // );
    // const data = await res.json();
    const data =await getProduct(searchParams?._id);
    return <CreateProductForm data={data} _id={searchParams?._id || ""} />;
  } else {
    return <CreateProductForm _id={""} />;
  }
};

export default page;
