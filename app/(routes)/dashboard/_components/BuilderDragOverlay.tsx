"use client";
import React, { useState } from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import BlockBtnDragOverlay from "@/components/BlockBtnDragOverlay";
import { FormBlockType } from "@/@types/form-block.type";
import { FormBlocks } from "@/lib/form-blocks";
import { useBuilder } from "@/context/builder-provider";

const BuilderDragOverlay = () => {
  const { blocks } = useBuilder();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      console.log("ITEM DRAG", event);
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let fallbackNode = <div>No block drag</div>;
  const isBlockBtnElement = draggedItem?.data.current?.isBlockBtnElement;
  const isCanvasRowLayout = draggedItem?.data.current?.isCanvasRowLayout;

  if (isBlockBtnElement) {
    const blockType = draggedItem.data?.current?.blockType as FormBlockType;
    fallbackNode = <BlockBtnDragOverlay formBlock={FormBlocks[blockType]} />;
  }

  if (isCanvasRowLayout) {
    const blockId = draggedItem.data?.current?.blockId;
    const block = blocks.find((block) => block.id === blockId);
    if (!block) fallbackNode = <div>No block drag</div>;
    else {
      const CanvasBlockComponent = FormBlocks[block.blockType].canvasComponent;
      fallbackNode = (
        <div className="pointer-events-none">
          <CanvasBlockComponent blockInstance={block} />;
        </div>
      );
    }
  }

  return (
    <DragOverlay>
      <div className="opacity-95">{fallbackNode}</div>
    </DragOverlay>
  );
};

export default BuilderDragOverlay;
