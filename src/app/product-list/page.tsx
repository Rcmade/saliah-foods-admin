import Loading from "@/components/Loading";
import ProductListComponent from "@/components/ProductListComponent";
import React, { Suspense } from "react";

const ProductListPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ProductListComponent />
      </Suspense>
    </div>
  );
};

export default ProductListPage;
