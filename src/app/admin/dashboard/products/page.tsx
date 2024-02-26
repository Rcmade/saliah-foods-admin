import { ProductDataTable } from "@/components/table/product-table";
import { getAllProducts } from "@/lib/actions/product-actions";

export default async function ProductPage() {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product`,
  //   { method: "GET", cache: "no-store" }
  // );
  // const data = await res.json();

  const data = await getAllProducts();

  return <ProductDataTable data={data} />;
}
