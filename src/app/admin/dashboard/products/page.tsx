import { ProductDataTable } from "@/components/table/product-table";

export default async function ProductPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product`,
    { method: "GET", cache: "no-store" }
  );
  const data = await res.json();

  return <ProductDataTable data={data} />;
}
