import React from "react";
import { useProduct } from "../hooks/useProduct";
import { usePlugin } from "../context/PluginContext";

export const ProductDetails: React.FC<{ productId: string }> = ({
  productId,
}) => {
  const { product, loading } = useProduct(productId);
  const { setValue } = usePlugin();
  return (
    <div className={"product-details-container"}>
      {product && (
        <>
          <img
            className={"product-details-image"}
            src={product.defaultImage?.urlOriginal}
          />
          <h1 className={"product-details-title"}>{product.name}</h1>
          <div className={"product-details-description"}>
            {product.plainTextDescription}
          </div>
          <div className={"product-details-price"}>
            {product.prices.price.currencyCode} {product.prices.price.value} -{" "}
            {product.availabilityV2.status}
          </div>

          <button
            className={"product-details-clear DatoCMS-button"}
            onClick={() => setValue("")}
          >
            Clear
          </button>
        </>
      )}

      {loading && <div className={"search-state"}>Loading</div>}
      {!loading && !product && (
        <div className={"search-state"}>Product not found</div>
      )}
    </div>
  );
};
