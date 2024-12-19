import { FormBlocks } from "@/lib/form-blocks";
import { FormBlockInstance } from "@/@types/form-block.type";

const ChildPropertiesComponentWrapper = ({
  index,
  parentId,
  block,
}: {
  index: number;
  parentId: string;
  block: FormBlockInstance;
}) => {
  const PropertiesComponent =
    FormBlocks?.[block.blockType]?.propertiesComponent;
  if (!PropertiesComponent) return null; // Handle cases where no canvas component exists

  return (
    <PropertiesComponent
      positionIndex={index}
      parentId={parentId}
      blockInstance={block}
    />
  );
};

export default ChildPropertiesComponentWrapper;
