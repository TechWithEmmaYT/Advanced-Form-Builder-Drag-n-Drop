import { FormBlockInstance, FormBlocks } from "@/@types/form-block.type";

const ChildCanvasComponentWrapper = ({
  block,
}: {
  block: FormBlockInstance;
}) => {
  const CanvasComponent = FormBlocks[block.blockType]?.canvasComponent;
  if (!CanvasComponent) return null; // Handle cases where no canvas component exists

  return <CanvasComponent blockInstance={block} />;
};

export default ChildCanvasComponentWrapper;
