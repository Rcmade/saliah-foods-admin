import CreateProductForm from "@/components/forms/create-product";
import React from "react";

interface PageProps {
  params: { page: string };
  searchParams: { [key: string]: string };
}
const page = async ({ searchParams }: PageProps) => {
  if (searchParams?.type === "edit" && searchParams?._id) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${searchParams?._id}`,
      { method: "GET", cache: "no-store" }
    );
    const data = await res.json();
    return <CreateProductForm data={data} _id={searchParams?._id || ""} />;
  } else {
    return <CreateProductForm _id={""} />;
  }
};

export default page;
