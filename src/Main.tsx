import React from "react";
import { usePlugin } from "./context/PluginContext";
import { ProductDetails } from "./components/ProductDetails";
import { Search } from "./components/Search";

export const Main: React.FC = () => {
  const { value } = usePlugin();
  return (
    <div
      className={`plugin-container ${
        value ? "plugin-container__with_product" : ""
      }`}
    >
      {value ? <ProductDetails productId={value} /> : <Search />}
    </div>
  );
};
