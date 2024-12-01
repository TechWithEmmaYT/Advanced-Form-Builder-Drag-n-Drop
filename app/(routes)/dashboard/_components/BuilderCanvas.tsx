"use client";
import React, { useState } from "react";
import {
  Active,
  DragEndEvent,
  useDndMonitor,
  useDroppable,
} from "@dnd-kit/core";

import { cn } from "@/lib/utils";
import { useBuilder } from "@/context/builder-provider";
import {
  FormBlockInstance,
  FormBlocks,
  FormBlockType,
} from "@/@types/form-block.type";
import { generateUniqueId } from "@/lib/helper";

const BuilderCanvas = () => {
  const {
    addBlock,
    blocks,

    insertBlockLayoutAtIndex,
    repositionBlockLayout,
    handleSelectedLayout,
  } = useBuilder();

  const [activeBlock, setActiveBlock] = useState<Active | null>(null);

  const droppable = useDroppable({
    id: "builder-canvas-droppable",
    data: {
      isBuilderCanvasDropArea: true,
    },
  });

  useDndMonitor({
    onDragStart: (event) => {
      setActiveBlock(event.active);
    },
    onDragEnd: (event: DragEndEvent) => {
      console.log("DRAG END", event);
      const { active, over } = event;
      if (!over || !active) return;
      setActiveBlock(null);

      const isBlockBtnElement = active.data?.current?.isBlockBtnElement;
      const isRowLayout = active.data?.current?.blockType;

      const isDraggingOverCanvas = over.data?.current?.isBuilderCanvasDropArea;

      if (
        isBlockBtnElement &&
        isRowLayout === "RowLayout" &&
        isDraggingOverCanvas
      ) {
        const blockType = active.data?.current?.blockType;
        const newBlock = FormBlocks[blockType as FormBlockType].createInstance(
          generateUniqueId()
        );
        console.log("NEW BLOCK", newBlock);
        addBlock(newBlock);
        return;
      }

      // SECOND -> NEW BLOCK ROW LAYOUT TO A SPECIFIC POSITION

      const isDroppingOverCanvasRowLayoutAbove = over.data?.current?.isAbove;
      const isDroppingOverCanvasRowLayoutBelow = over.data?.current?.isBelow;

      const isDroppingOverCanvasRowLayout =
        isDroppingOverCanvasRowLayoutAbove ||
        isDroppingOverCanvasRowLayoutBelow;

      const droppingLayoutBlockOverCanvas =
        isBlockBtnElement &&
        isRowLayout === "RowLayout" &&
        isDroppingOverCanvasRowLayout;

      if (droppingLayoutBlockOverCanvas) {
        console.log(
          "droppingLayoutBlockOverCanvas",
          droppingLayoutBlockOverCanvas
        );

        const blockType = active.data?.current?.blockType;
        const newBlock = FormBlocks[blockType as FormBlockType].createInstance(
          generateUniqueId()
        );

        const targetBlockId = over.data?.current?.blockId;

        let position: "above" | "below" = "below";
        if (isDroppingOverCanvasRowLayoutAbove) {
          position = "above";
        }
        // console.log(
        //   "insertBlockLayoutAtIndex",

        //   position,
        //   targetBlockId,

        //   newBlock
        // );
        insertBlockLayoutAtIndex(targetBlockId, newBlock, position);
        return;
      }

      // THIRD -> EXISTING BLOCK ROW LAYOUT TO A SPECIFIC POSITION
      const isDraggingCanvasRowLayout = active.data?.current?.isCanvasRowLayout;
      // console.log(active, "active Rowlayout");
      // console.log("   -----------");
      // console.log(over, "over Rowlayout");

      const draggingCanvasRowLayoutOverAnotherRowLayout =
        isDroppingOverCanvasRowLayout && isDraggingCanvasRowLayout;

      if (draggingCanvasRowLayoutOverAnotherRowLayout) {
        const activeId = active.data?.current?.blockId;
        const overId = over.data?.current?.blockId;

        let position: "above" | "below" = "below";
        if (isDroppingOverCanvasRowLayoutAbove) {
          position = "above";
        }

        repositionBlockLayout(activeId, overId, position);
        return;
      }
    },
  });

  //console.log(activeBlock, "activeBlock canvas");

  return (
    <div
      className="relative w-full h-[calc(100vh_-_64px)] pt-4 pb-[120px] overflow-y-auto
     scrollbar transition-all duration-300
    "
    >
      {/* {Droppable Canvas} */}
      <div className="w-full h-full max-w-[650px] mx-auto">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            `w-full relative bg-transparent  px-2 rounded-md
          flex flex-col min-h-svh items-center justify-start pt-1 pb-14 rounded-b-md
          `,
            droppable.isOver && blocks.length >= 1 && "ring-4 ring-inset"
          )}
        >
          <div
            className="w-full mb-3
             bg-white bg-[url(/images/form-bg.jpg)] bg-center bg-cover border shadow-sm h-[135px] max-w-[768px]
          rounded-md px-1"
          />

          {blocks.length > 0 && (
            <div className="flex flex-col w-full gap-4">
              {blocks.map((block) => (
                <CanvasBlockWrapper
                  key={block.id}
                  activeBlock={activeBlock}
                  blockLayout={block}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function CanvasBlockWrapper({
  blockLayout,
  activeBlock,
}: {
  blockLayout: FormBlockInstance;
  activeBlock: Active | null;
}) {
  const CanvasBlock = FormBlocks[blockLayout.blockType].canvasComponent;

  const topCorner = useDroppable({
    id: blockLayout.id,
    data: {
      blockType: blockLayout.blockType,
      blockId: blockLayout.id,
      isAbove: true,
    },
  });

  const bottomCorner = useDroppable({
    id: blockLayout.id + "_bottom_half",
    data: {
      blockType: blockLayout.blockType,
      blockId: blockLayout.id,
      isBelow: true,
    },
  });
  return (
    <div className="relative">
      <div
        ref={topCorner.setNodeRef}
        className="absolute top-0 w-full h-1/2 rounded-t-md pointer-events-none"
      >
        {topCorner.isOver &&
          !blockLayout.isLocked &&
          activeBlock?.data?.current?.blockType === "RowLayout" && (
            <div className="absolute w-full -top-[4px] h-[6px] bg-primary rounded-t-md"></div>
          )}
      </div>
      {/* Bottom Half Drop Zone */}
      <div
        ref={bottomCorner.setNodeRef}
        className="absolute bottom-0 w-full h-1/2 rounded-b-md pointer-events-none"
      >
        {bottomCorner.isOver &&
          !blockLayout.isLocked &&
          activeBlock?.data?.current?.blockType === "RowLayout" && (
            <div className="absolute w-full bottom-[1px] h-[6px] bg-primary rounded-b-md"></div>
          )}
      </div>

      <div className="relative mb-1">
        <CanvasBlock blockInstance={blockLayout} />
      </div>
    </div>
  );
}

export default BuilderCanvas;
