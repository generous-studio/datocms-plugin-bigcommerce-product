import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useProductSearch } from "../hooks/useProductSearch";
import { ProductsGrid } from "./ProductsGrid";
import { usePlugin } from "../context/PluginContext";
import { Product } from "../types/Product";

//@ts-ignore
import icon from "../styles/search.svg";

const SearchBar: React.FC<{
  onValue: (term: string) => void;
  loading: boolean;
}> = ({ onValue, loading }) => {
  const [value, _setValue] = useState<string>();
  const onChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => _setValue(ev.target.value),
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => onValue(value || ""), 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className={"search-bar__container"}>
      <img src={icon} className={"search-bar__icon"} />
      <input
        type={"text"}
        className={"search-bar__input"}
        placeholder={"Search products..."}
        onChange={onChange}
        value={value}
      />
      <i className={`search-bar__spinner ${loading ? "visible" : ""}`} />
    </div>
  );
};

export const Search: React.FC = () => {
  const { setValue } = usePlugin();
  const [searchValue, setSearchValue] = useState<string>("");
  const { loading, products } = useProductSearch(searchValue);
  const onProductClick = useCallback(
    (p: Product) => setValue(p.id),
    [setValue]
  );
  return (
    <>
      <SearchBar onValue={setSearchValue} loading={loading} />
      <ProductsGrid products={products} onProductClick={onProductClick} />
      {loading && <div className={"search-state"}>Loading...</div>}
      {!loading && searchValue && (!products || products.length === 0) && (
        <div className={"search-state"}>No products found.</div>
      )}
    </>
  );
};
