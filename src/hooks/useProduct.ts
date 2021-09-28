import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { getProduct } from "../integration/getProduct";
import { usePlugin } from "../context/PluginContext";

export const useProduct = (productId: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product>();
  const { configuration } = usePlugin();

  useEffect(() => {
    setProduct(undefined);

    if (!productId) {
      return;
    }
    setLoading(true);

    getProduct(productId, configuration)
      .then((product) => setProduct(product))
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading };
};
