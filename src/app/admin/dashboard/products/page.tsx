import { ProductDataTable } from "@/components/table/product-table";
import { getAllProducts } from "@/lib/actions/product-actions";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function ProductPage() {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product`,
  //   { method: "GET", cache: "no-store" }
  // );
  // const data = await res.json();

  const data = await getAllProducts();

  return <ProductDataTable data={data} />;
}
