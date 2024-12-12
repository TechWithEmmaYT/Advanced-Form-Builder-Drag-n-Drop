import { FormBlockInstance, HandleBlurFunc } from "@/@types/form-block.type";

import { FormBlocks } from "@/lib/form-blocks";

const ChildFormComponentWrapper = ({
  block,
  handleBlur,
  isError,
  errorMessage,
}: {
  block: FormBlockInstance;
  handleBlur?: HandleBlurFunc;
  isError?: boolean;
  errorMessage?: string;
}) => {
  const FormComponent = FormBlocks[block.blockType]?.formComponent;
  if (!FormComponent) return null; // Handle cases where no canvas component exists

  return (
    <FormComponent
      blockInstance={block}
      isError={isError}
      errorMessage={errorMessage}
      handleBlur={handleBlur}
    />
  );
};

export default ChildFormComponentWrapper;
