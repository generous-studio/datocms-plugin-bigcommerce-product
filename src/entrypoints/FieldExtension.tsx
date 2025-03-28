import {RenderFieldExtensionCtx} from "datocms-plugin-sdk";
import {normalizeConfig} from "../types/config.ts";
import {Canvas, ContextInspector} from "datocms-react-ui";
import {Product} from "../types/product.ts";
import {EmptyState} from "../components/EmptyState";
import {FieldBackground} from "../components/FieldBackground";
import {SelectedProductDetails} from "../components/SelectedProductDetails";

export const FieldExtension = ({ctx}: { ctx: RenderFieldExtensionCtx }) => {
  const fieldType = ctx.field.attributes.field_type;

  const currentValue = ctx.formValues[ctx.fieldPath] as string | number | null

  const pluginConfig = normalizeConfig(ctx.plugin.attributes.parameters)
  const fieldConfig = ctx.field.attributes.appearance.parameters as unknown as { idType: "id" | "entityId" }

  let graphqlIdField: "id" | "entityId";
  if (fieldType === "integer")
    graphqlIdField = "entityId"
  else
    switch (fieldConfig.idType) {
      case "entityId":
      case "id":
        graphqlIdField = fieldConfig.idType;
        break;
      default:
        graphqlIdField = pluginConfig.isStoreEntityIdByDefault ? "entityId" : "id";
    }

  const handleReset = () => {
    ctx.setFieldValue(ctx.fieldPath, null);
  };

  const triggerModal = async () => {
    const product = (await ctx.openModal({
      id: 'browseProducts',
      title: 'Select BigCommerce product',
      width: 'xl',
    })) as Product | null;

    if (product) {
      ctx.setFieldValue(
        ctx.fieldPath,
        fieldType !== "integer" ? String(product[graphqlIdField]) : product[graphqlIdField],
      );
    }
  };

  return <Canvas ctx={ctx}>
    <FieldBackground>
      {currentValue ?
        <SelectedProductDetails
          productId={currentValue}
          idKey={graphqlIdField}
          config={pluginConfig}
          onReset={handleReset}
          onSelectAnotherProduct={triggerModal}
        />
        : <EmptyState onSelectProduct={triggerModal}/>
      }
    </FieldBackground>
    {process.env.NODE_ENV === "development" && <div>
      <ContextInspector/>
    </div>}
  </Canvas>
}
