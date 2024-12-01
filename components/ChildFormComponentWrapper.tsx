import { FormBlockInstance, FormBlocks } from "@/@types/form-block.type";

const ChildFormComponentWrapper = ({ block }: { block: FormBlockInstance }) => {
  const FormComponent = FormBlocks[block.blockType]?.formComponent;
  if (!FormComponent) return null; // Handle cases where no canvas component exists

  return <FormComponent blockInstance={block} />;
};

export default ChildFormComponentWrapper;
