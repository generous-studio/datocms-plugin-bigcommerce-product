import {RenderManualFieldExtensionConfigScreenCtx} from "datocms-plugin-sdk";
import {Canvas, ContextInspector, SelectField} from "datocms-react-ui";

const OPTIONS = [
  {value: null, label: "Use global setting"},
  {value: "id", label: "Alphanumeric (id)"},
  {value: "entityId", label: "Numeric (entityId)"}
]

export const FieldConfigScreen = ({ctx}: {
  ctx: RenderManualFieldExtensionConfigScreenCtx,
  extensionId: string
}) => {

  if (ctx.pendingField.attributes.field_type === "integer") {
    return null;
  }
  return (
    <Canvas ctx={ctx}>
      <SelectField
        id={"idType"}
        name={"idType"}
        label={"(GraphQL) Product Id field to use"}
        value={OPTIONS.find(o => o.value === (ctx.parameters.idType || null))}
        //@ts-expect-error value exists, as per OPTIONS & no multi-select possibility
        onChange={({value}) => ctx.setParameters({...ctx.parameters, idType: value})}
        selectInputProps={{
          options: OPTIONS,
        }}
      />


      {process.env.NODE_ENV === "development" && <div>
        <ContextInspector/>
      </div>}
    </Canvas>
  );
}
