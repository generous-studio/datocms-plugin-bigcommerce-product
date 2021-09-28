import { useEffect, useState } from "react";
import { usePlugin } from "../context/PluginContext";
import { searchProducts } from "../integration/searchProducts";
import { Product } from "../types/Product";

export const useProductSearch = (term: string) => {
  const { configuration } = usePlugin();

  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    setLoading(true);
    setProducts([]);

    searchProducts(term, configuration)
      .then((products) => {
        setProducts(products);
      })
      .finally(() => setLoading(false));

    return () => {};
  }, [term]);

  return { loading, products };
};
