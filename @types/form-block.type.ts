import { HeadingBlock } from "@/components/blocks/HeadingBlock";
import { RowLayoutBlock } from "@/components/blocks/layouts/RowLayout";
import { ParagraphBlock } from "@/components/blocks/ParagraphBlock";
import { RadioSelectBlock } from "@/components/blocks/RadioSelectBlock";
import { TextAreaBlock } from "@/components/blocks/TextAreaBlock";
import { TextFieldBlock } from "@/components/blocks/TextField";

export type FormBlockType =
  | "RowLayout"
  | "Heading"
  | "Paragraph"
  | "TextArea"
  | "RadioSelect"
  | "TextField";
export type FormCategoryType = "Layout" | "Form";

export type HandleBlurFunc = (key: string, value: string) => void;

export type FormBlock = {
  blockType: FormBlockType;
  blockCategory: FormCategoryType;

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

type FormBlocksType = {
  [key in FormBlockType]: FormBlock;
};
export const FormBlocks: FormBlocksType = {
  RowLayout: RowLayoutBlock,
  Heading: HeadingBlock,
  Paragraph: ParagraphBlock,
  TextArea: TextAreaBlock,
  RadioSelect: RadioSelectBlock,
  TextField: TextFieldBlock,
};
