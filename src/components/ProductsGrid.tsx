import React from "react";
import { Product } from "../types/Product";

export const ProductsGrid: React.FC<{
  products: Product[];
  onProductClick: (p: Product) => void;
}> = ({ products, onProductClick }) => {
  return (
    <div className={"products-grid"}>
      {products.map((product) => (
        <article
          key={product.id}
          className={"products-grid__card"}
          onClick={() => onProductClick(product)}
        >
          <img src={product.defaultImage?.urlOriginal} />
          <h1 className={"products-grid__card-title"}>{product.name}</h1>
        </article>
      ))}
    </div>
  );
};
