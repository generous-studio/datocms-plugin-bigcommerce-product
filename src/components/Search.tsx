import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useProductSearch } from "../hooks/useProductSearch";
import { ProductsGrid } from "./ProductsGrid";
import { usePlugin } from "../context/PluginContext";
import { Product } from "../types/Product";

const SearchBar: React.FC<{ onValue: (term: string) => void }> = ({
  onValue,
}) => {
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
      <input
        type={"text"}
        className={"search-bar__input"}
        placeholder={"Search for products by name"}
        onChange={onChange}
        value={value}
      />
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
      <SearchBar onValue={setSearchValue} />
      <ProductsGrid products={products} onProductClick={onProductClick} />
    </>
  );
};
