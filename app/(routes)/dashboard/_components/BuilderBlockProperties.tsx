import React from "react";
import { MousePointerClickIcon } from "lucide-react";
import { useBuilder } from "@/context/builder-provider";
import PreviewDialog from "./_common/PreviewDialog";
import SaveFormBtn from "./_common/SaveFormBtn";
import PublishFormBtn from "./_common/PublishFormBtn";
import { FormBlocks } from "@/lib/form-blocks";

const BuilderBlockProperties = () => {
  const { selectedBlockLayout } = useBuilder();

  const RowPropertyBlock =
    selectedBlockLayout &&
    FormBlocks[selectedBlockLayout?.blockType]?.propertiesComponent;
  return (
    <>
      <div className="relative w-[320px]">
        <div
          className=" fixed right-0 w-[320px]  bg-white border-l shadow-sm
         h-screen pb-36 mt-0 scrollbar overflow-auto"
        >
          {/* {CONTENT} */}
          <div className="flex flex-col w-full items-center h-auto min-h-full">
            <div className="w-full flex flex-row items-center bg-white pb-2 pt-3 sticky border-b border-gray-200 top-0 gap-2 px-2">
              <PreviewDialog />
              <SaveFormBtn />
              <PublishFormBtn />
            </div>
            {!selectedBlockLayout ? (
              <div className="text-gray-400 gap-1 text-center text-[15px]  w-full flex flex-col items-center justify-center flex-1 h-auto">
                <MousePointerClickIcon size="3rem" />
                <p>Click the Layout to modify block</p>
              </div>
            ) : (
              <div className="w-full pt-1">
                <div className="px-2 pt-3 pb-3 border-b border-gray-200">
                  <h5 className="text-left font-medium text-sm">
                    Layout Block Properties
                  </h5>
                </div>
                {RowPropertyBlock && (
                  <RowPropertyBlock blockInstance={selectedBlockLayout} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuilderBlockProperties;
