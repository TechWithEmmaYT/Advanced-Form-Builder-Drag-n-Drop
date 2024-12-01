import React from "react";
import { Button } from "./ui/button";
import { FormBlock } from "@/@types/form-block.type";

const BlockBtnDragOverlay = ({ formBlock }: { formBlock: FormBlock }) => {
  const { icon: Icon, label } = formBlock.blockBtnElement;
  return (
    <Button
      variant="secondary"
      className="flex flex-col gap-2 h-20 w-20  cursor-grab"
    >
      <Icon className="!w-10 !h-10 text-gray-400" />
      <span className="text-xs -mt-1 font-semibold text-gray-600">{label}</span>
    </Button>
  );
};

export default BlockBtnDragOverlay;
