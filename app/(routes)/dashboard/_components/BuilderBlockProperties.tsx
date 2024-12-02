import React from "react";
import { Layout } from "lucide-react";
import { useBuilder } from "@/context/builder-provider";
import { FormBlocks } from "@/@types/form-block.type";
import PreviewDialog from "./_common/PreviewDialog";
import SaveFormBtn from "./_common/SaveFormBtn";
import PublishFormBtn from "./_common/PublishFormBtn";

const BuilderBlockProperties = () => {
  const { selectedBlockLayout } = useBuilder();

  const RowPropertyBlock =
    selectedBlockLayout &&
    FormBlocks[selectedBlockLayout?.blockType]?.propertiesComponent;
  return (
    <>
      <div className="relative w-[300px]">
        <div
          className=" fixed right-0 w-[299px]  bg-white border-l border-[#eee] shadow-sm
         h-screen pb-36 mt-0 scrollbar overflow-auto"
        >
          <div className="flex flex-col w-full items-center h-auto min-h-full">
            <div className="w-full flex flex-row items-center bg-white pb-2 pt-3  sticky border-b border-gray-300 top-0  gap-2 px-2">
              <PreviewDialog />
              <SaveFormBtn />
              <PublishFormBtn />
            </div>
            {!selectedBlockLayout ? (
              <div className="text-muted-foreground  w-full flex flex-col items-center justify-center flex-1 h-auto">
                <Layout />
                <p>Layout not selected</p>
              </div>
            ) : (
              <div className="w-full pt-2">
                <div className="px-3 pt-2 pb-0">
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
