import {useProduct} from "../../hooks/useProduct";
import {ProductIdKey} from "../../types/product.ts";
import {ValidConfig} from "../../types/config.ts";
import {Button, Spinner} from "datocms-react-ui";
import styles from "./style.module.css"

export const SelectedProductDetails = ({
                                 productId,
                                 idKey,
                                 config,
                                 onReset,
                                 onSelectAnotherProduct
                               }: {
  productId: string | number,
  idKey: ProductIdKey,
  config: ValidConfig,
  onReset: () => void,
  onSelectAnotherProduct: () => void
}) => {
  const {product, state, retry} = useProduct(productId, idKey, config);

  return (
    <div className={styles['productDetailsContainer']}>
      {product && (
        <>
          <img
            className={styles.productDetailsImage}
            src={product.defaultImage?.urlOriginal}
          />
          <h1 className={styles.productDetailsTitle}>{product.name}</h1>
          <div className={styles.productDetailsDescription}>
            {product.plainTextDescription}
          </div>
          <div className={styles.productDetailsPrice}>
            {product.prices.price.currencyCode} {product.prices.price.value} -{" "}
            {product.availabilityV2.status}
          </div>

          <div className={styles.actionsRow}>
            <Button
              onClick={onSelectAnotherProduct}
              buttonType={"muted"}
              buttonSize={"xs"}>
              Replace...
            </Button>
            <Button
              onClick={onReset}
              className={styles.productDetailsClear}
              buttonType={"negative"}
              buttonSize={"xs"}

            >
              Clear
            </Button>
          </div>
        </>
      )}

      {state === "loading" && <Spinner placement={"centered"}/>}
      {((state === "idle" && !product) || state === "error") && (
        <div className={styles.searchState}>
          <div>{state === "error" ? "There has been an error fetching the product." : "Product not found..."}</div>
        <div className={styles.actionsRow} style={{marginRight: "auto", justifyContent: "start", marginTop: 8}}>
          <Button buttonType={"primary"} buttonSize={"xs"} onClick={retry}>Retry</Button>
          <Button buttonType={"negative"} buttonSize={"xs"} onClick={onSelectAnotherProduct}>Replace...</Button>
        </div>
        </div>
      )}
    </div>
  );
};
