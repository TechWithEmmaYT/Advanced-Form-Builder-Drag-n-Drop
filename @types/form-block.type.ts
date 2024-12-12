export type FormCategoryType = "Layout" | "Form";
export type FormBlockType =
  | "RowLayout"
  | "Heading"
  | "Paragraph"
  | "RadioSelect"
  | "TextArea"
  | "TextField"
  | "StarRating";

export type HandleBlurFunc = (key: string, value: string) => void;

export type FormErrorsType = {
  [key: string]: string;
};

export type FormBlock = {
  blockCategory: FormCategoryType;
  blockType: FormBlockType;

  createInstance: (id: string) => FormBlockInstance;

  blockBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  canvasComponent: React.FC<{
    blockInstance: FormBlockInstance;
  }>;
  formComponent: React.FC<{
    blockInstance: FormBlockInstance;
    handleBlur?: HandleBlurFunc;
    isError?: boolean;
    errorMessage?: string;
    formErrors?: FormErrorsType;
  }>;
  propertiesComponent: React.FC<{
    positionIndex?: number;
    parentId?: string;
    blockInstance: FormBlockInstance;
  }>;
};

export type FormBlockInstance = {
  id: string;
  blockType: FormBlockType;
  attributes?: Record<string, any>;
  childblocks?: FormBlockInstance[];
  isLocked?: boolean;
};

export type FormBlocksType = {
  [key in FormBlockType]: FormBlock;
};

// export const FormBlocks: FormBlocksType = {
//   RowLayout: RowLayoutBlock,
//   Heading: HeadingBlock,
//   Paragraph: ParagraphBlock,
//   TextArea: TextAreaBlock,
//   RadioSelect: RadioSelectBlock,
//   TextField: TextFieldBlock,
//   StarRating: StarRatingBlock,
// };
