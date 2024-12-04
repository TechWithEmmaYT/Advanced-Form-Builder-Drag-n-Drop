import React from "react";
import { Button } from "./ui/button";
import { FormBlock } from "@/@types/form-block.type";

const BlockBtnDragOverlay = ({ formBlock }: { formBlock: FormBlock }) => {
  const { icon: Icon, label } = formBlock.blockBtnElement;
  return (
    <Button
      variant="secondary"
      className="flex flex-col !bg-white text-gray-600 ring-2 ring-primary/80 gap-2 h-20 w-20  cursor-grab"
    >
      <Icon className="!w-8 !h-8 " />
      <span className="text-xs -mt-1  text-gray-600">{label}</span>
    </Button>
  );
};

export default BlockBtnDragOverlay;
