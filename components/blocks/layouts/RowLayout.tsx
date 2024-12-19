import { useState } from "react";
import { Copy, GripHorizontalIcon, Rows2, Trash2Icon, X } from "lucide-react";
import {
  Active,
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import {
  FormBlock,
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  FormErrorsType,
  HandleBlurFunc,
} from "@/@types/form-block.type";
import { cn } from "@/lib/utils";
import { FormBlocks } from "@/lib/form-blocks";
import { generateUniqueId } from "@/lib/helper";
import { useBuilder } from "@/context/builder-provider";
import { Card, CardContent, CardFooter } from "../../ui/card";
import ChildPropertiesComponentWrapper from "../../ChildPropertiesComponentWrapper";
import ChildFormComponentWrapper from "@/components/ChildFormComponentWrapper";
import ChildCanvasComponentWrapper from "../../ChildCanvasComponentWrapper";
import { Button } from "../../ui/button";
import { blockLayouts } from "@/constant";

const blockType: FormBlockType = "RowLayout";
const blockCategory: FormCategoryType = "Layout";

export const RowLayoutBlock: FormBlock = {
  blockType,
  blockCategory,
  createInstance: (id: string) => ({
    id: `row-layout-${id}`,
    blockType,
    isLocked: false,
    attributes: {},
    childblocks: [], // Initially empty
  }),

  blockBtnElement: {
    icon: Rows2, // Example icon
    label: "Row Layout",
  },

  canvasComponent: RowLayoutCanvasComponent,
  formComponent: RowLayoutFormComponent,
  propertiesComponent: RowLayoutPropertiesComponent,
};

function RowLayoutCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const {
    selectedBlockLayout,
    handleSelectedLayout,
    updateBlockLayout,
    duplicateBlockLayout,
    removeBlockLayout,
  } = useBuilder();

  const [activeBlock, setActiveBlock] = useState<Active | null>(null);

  const childblocks = blockInstance.childblocks || [];

  const isSelected = selectedBlockLayout?.id === blockInstance.id;

  const droppable = useDroppable({
    id: blockInstance.id, // Use the unique ID for the RowLayout block
    disabled: blockInstance.isLocked ? true : false,
    data: {
      isRowLayoutDropArea: true,
    },
  });

  const draggable = useDraggable({
    id: blockInstance.id + "_drag-area",
    disabled: blockInstance.isLocked,
    data: {
      blockType: blockInstance.blockType,
      blockId: blockInstance.id,
      isCanvasRowLayout: true,
    },
  });

  //Come back to the
  useDndMonitor({
    onDragStart: (event) => {
      setActiveBlock(event.active);
    },
    onDragEnd: (event: DragEndEvent) => {
      console.log("DRAG Row END", event);
      const { active, over } = event;
      if (!over || !active) return;

      setActiveBlock(null);

      const isBlockBtnElement = active.data?.current?.isBlockBtnElement;
      //const isNotRowLayout = active.data?.current?.blockType !== "RowLayout";
      const isLayout = active.data?.current?.blockType;

      const overBlockId = over?.id;

      if (
        isBlockBtnElement &&
        !blockLayouts.includes(isLayout) &&
        typeof overBlockId == "string" &&
        overBlockId === blockInstance.id
      ) {
        const blockType = active.data?.current?.blockType;
        const newBlock = FormBlocks[blockType as FormBlockType].createInstance(
          generateUniqueId()
        );
        const updatedChildrenBlock = [...childblocks, newBlock];
        updateBlockLayout(blockInstance.id, updatedChildrenBlock);

        // Select the row layout
        if (selectedBlockLayout?.id === overBlockId) {
          handleSelectedLayout({
            ...blockInstance,
            childblocks: updatedChildrenBlock,
          });
        }
      }
    },
  });

  function removeChildBlock(e: { stopPropagation: () => void }, id: string) {
    e.stopPropagation();
    const filteredBlock = childblocks.filter((child) => child.id !== id);
    updateBlockLayout(blockInstance.id, filteredBlock);

    if (isSelected)
      handleSelectedLayout({
        ...blockInstance,
        childblocks: filteredBlock,
      });
  }

  //console.log(activeBlock, "activeBlock canvas");

  if (draggable.isDragging) return null;

  return (
    <div ref={draggable.setNodeRef} className="max-w-full">
      {blockInstance.isLocked && <Border />}

      <Card
        ref={droppable.setNodeRef}
        className={cn(
          `w-full bg-white relative border shadow-sm min-h-[120px] 
          max-w-[768px]
          rounded-md !p-0`,
          blockInstance.isLocked && "!rounded-t-none"
        )}
        onClick={() => {
          handleSelectedLayout(blockInstance);
        }}
      >
        <CardContent className="px-2 pb-2">
          {isSelected && !blockInstance.isLocked && (
            <div className="w-[5px] absolute left-0 top-0 rounded-l-md  h-full 
            bg-primary" />
          )}

          {!blockInstance.isLocked && (
            <div
              {...draggable.listeners}
              {...draggable.attributes}
              role="button"
              className="flex items-center w-full h-[24px] 
              cursor-move justify-center"
            >
              <GripHorizontalIcon
                size="20px"
                className="text-muted-foreground"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {/* Also CHECK IF THE ActiveBlock is BlockBtn or RowLayout */}
            {droppable.isOver &&
              !blockInstance.isLocked &&
              activeBlock?.data?.current?.isBlockBtnElement &&
              !blockLayouts.includes(activeBlock?.data?.current?.blockType) && (
                <div className="relative border border-dotted border-primary bg-primary/10 w-full h-28">
                  <div
                    className="absolute left-1/2 top-0 -translate-x-1/2 text-xs bg-primary text-white 
        text-center w-28 p-1 rounded-b-full shadow-md"
                  >
                    Drag it here
                  </div>
                </div>
              )}

            {/* If there are no blocks, show the placeholder */}
            {!droppable.isOver && childblocks?.length === 0 ? (
              <PlaceHolder />
            ) : (
              <div className="flex w-full flex-col items-center justify-start
                gap-4 py-4 px-3 ">

                {childblocks?.map((childblock) => (
                  <div className="flex items-center justify-center gap-1 
                  h-auto w-full">
                    <ChildCanvasComponentWrapper
                      key={childblock.id}
                      block={childblock}
                    />
                    {isSelected && !blockInstance.isLocked && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="!bg-transparent"
                        onClick={(e) => removeChildBlock(e, childblock.id)}
                      >
                        <X />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>

        {isSelected && !blockInstance.isLocked && (
          <CardFooter className="flex items-center gap-3 justify-end 
          border-t py-3">
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                duplicateBlockLayout(blockInstance.id);
              }}
            >
              <Copy />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                removeBlockLayout(blockInstance.id);
              }}
            >
              <Trash2Icon />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

function RowLayoutFormComponent({
  blockInstance,
  handleBlur,
  formErrors,
}: {
  blockInstance: FormBlockInstance;
  handleBlur?: HandleBlurFunc;
  formErrors?: FormErrorsType;
}) {
  const childblocks = blockInstance.childblocks || [];

  return (
    <div className="max-w-full">
      {blockInstance.isLocked && <Border />}

      <Card
        className={cn(
          `w-full bg-white relative border shadow-sm min-h-[120px] max-w-[768px]
          rounded-md !p-0`,
          blockInstance.isLocked && "!rounded-t-none"
        )}
      >
        <CardContent className="px-2 pb-2">
          <div className="flex flex-wrap gap-2">
            <div className="flex w-full flex-col items-center justify-start  gap-4 py-4 px-3 ">
              {childblocks?.map((childblock) => (
                <div className="flex items-center justify-center gap-1 h-auto w-full">
                  <ChildFormComponentWrapper
                    key={childblock.id}
                    block={childblock}
                    handleBlur={handleBlur}
                    isError={!!formErrors?.[childblock.id]} // Check if there's an error
                    errorMessage={formErrors?.[childblock.id]} // Pass error message
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RowLayoutPropertiesComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const childrenBlocks = blockInstance.childblocks || [];

  return (
    <div className="pt-0 w-full">
      <div className="flex w-full flex-col items-center justify-start  gap-0 py-0 px-0 ">
        {childrenBlocks?.map((childblock, index) => (
          <div className="flex items-center justify-center gap-1 h-auto w-full">
            <ChildPropertiesComponentWrapper
              key={childblock.id}
              index={index + 1}
              parentId={blockInstance.id}
              block={childblock}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceHolder() {
  return (
    <div className="flex flex-col items-center justify-center border 
    border-dotted border-primary bg-primary/10 hover:bg-primary/5 
    w-full h-28 text-primary font-medium text-base gap-1">

      <p className="text-center text-primary/80">
        Drag and drop a block here to get started
      </p>
    </div>
  );
}

function Border() {
  return <div className="w-full rounded-t-md h-[8px] bg-primary" />;
}
