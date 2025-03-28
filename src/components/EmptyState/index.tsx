import {Button} from "datocms-react-ui";

export const EmptyState = ({onSelectProduct}: {
  onSelectProduct: () => void,
}) =>
  <div>
    <Button onClick={onSelectProduct}
            buttonType={"primary"}
            buttonSize={"xs"}>
      Chose product...
    </Button>
  </div>
