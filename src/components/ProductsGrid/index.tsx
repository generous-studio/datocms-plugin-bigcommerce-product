import React from "react";
import { Product } from "../../types/product";
import S from "./style.module.css"

export const ProductsGrid: React.FC<{
  products: Product[];
  onProductClick: (p: Product) => void;
}> = ({ products, onProductClick }) => {
  return (
    <div className={S.container}>
      {products.map((product) => (
        <article
          key={product.id}
          className={S.card}
          onClick={() => onProductClick(product)}
        >
          {product.defaultImage?.urlOriginal ? (
            <img
              className={S.cardImage}
              src={product.defaultImage.urlOriginal}
              alt={product.defaultImage.altText}
              loading="lazy"
            />
          ) : (
            <div className={S.cardImagePlaceholder}>No image</div>
          )}
          <h1 className={S.cardTitle}>{product.name}</h1>
        </article>
      ))}
    </div>
  );
};
