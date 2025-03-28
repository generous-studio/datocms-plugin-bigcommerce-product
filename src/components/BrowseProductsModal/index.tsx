import {RenderModalCtx} from "datocms-plugin-sdk";
import {ValidConfig} from "../../types/config.ts";
import {Canvas, Spinner, TextField, Toolbar} from "datocms-react-ui";
import {useDebouncedCallback} from "use-debounce";
import {useState} from "react";
import {useProductSearch} from "../../hooks/useProductSearch.ts";
import S from "./style.module.css"
import {ProductsGrid} from "../ProductsGrid";

const SearchBar = (props: { onChange: (term: string) => void }) => {
  const debouncedOnChange = useDebouncedCallback(props.onChange, 1000)
  return <TextField
    id={"search"}
    name={"search"}
    label={""}
    value={undefined}
    onChange={debouncedOnChange}
    placeholder={"Search products..."}
  />
}

export const BrowseProductsModal = (props: { ctx: RenderModalCtx, config: ValidConfig }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const productSearch = useProductSearch(props.config, searchTerm);

  return <Canvas ctx={props.ctx}>
    <Toolbar>
      <SearchBar onChange={v => setSearchTerm(v)}/>
    </Toolbar>
    <div className={S.container}>
      {productSearch.state === "loading" && <Spinner size={25} placement="centered"/>}
      {productSearch.state === "error" && "There has been an error, please try again later."}
      {productSearch.state === "idle" ? <>
          {productSearch.products.length === 0 ? "No products found." : <ProductsGrid
            products={productSearch.products}
            onProductClick={product => props.ctx.resolve(product)}
          />}
        </>
        : null}
    </div>
  </Canvas>
}
