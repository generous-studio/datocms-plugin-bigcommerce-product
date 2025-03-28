import {useCallback, useEffect, useState} from "react";
import {Product, ProductIdKey} from "../types/product";
import {getProducByEntityId, getProductById} from "../integration/getProduct";
import {ValidConfig} from "../types/config.ts";

export const useProduct = (productId: string | number, idKey: ProductIdKey, config: ValidConfig) => {
  const [state, setState] = useState<"loading" | "error" | "idle">("idle");
  const [product, setProduct] = useState<Product>();

  const fetchProduct = useCallback((productId: string | number) => {
    setState("loading");

    (idKey === "id" ? getProductById : getProducByEntityId)(productId, config)
      .then((product) => setProduct(product))
      .then(() => setState("idle"))
      .catch(e => {
        console.error(e);
        setState("error")
      });
  }, [])

  useEffect(() => {
    setProduct(undefined);

    if (!productId) {
      return;
    }
   fetchProduct(productId)
  }, [productId]);

  return { product, state, retry: () => fetchProduct(productId) };
};
