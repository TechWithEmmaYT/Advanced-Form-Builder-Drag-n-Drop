import React from "react";
import { Eye, Layout, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuilder } from "@/context/builder-provider";
import { FormBlocks } from "@/@types/form-block.type";
import PreviewDialog from "./_common/PreviewDialog";

const BuilderBlockProperties = () => {
  const { selectedBlockLayout } = useBuilder();

  const RowPropertyBlock =
    selectedBlockLayout &&
    FormBlocks[selectedBlockLayout?.blockType]?.propertiesComponent;
  console.log(selectedBlockLayout, "selectedBlockLayout");
  return (
    <>
      <div className="relative w-[300px]">
        <div
          className=" fixed right-0 w-[299px]  bg-white border-l border-[#eee] shadow-sm
         h-screen pb-36 mt-0 scrollbar overflow-auto"
        >
          <div className="flex flex-col w-full items-center h-auto min-h-full">
            <div className="w-full flex flex-row items-center bg-white pb-2 pt-3  sticky border-b top-0  gap-2 px-2">
              <PreviewDialog />
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent !text-primary !border-primary"
              >
                <Save /> Save
              </Button>
              <Button size="sm" variant="default">
                <Send /> Publish
              </Button>
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

{
  /* 
        <div className="hidden fixed border top-20 w-14 right-8  min-h-60 h-full bg-white p-2 rounded-t-md  shadow-md">
          <div className="flex flex-col items-center gap-3">
            <Button variant="outline" size="icon">
              <Laptop />
            </Button>
            <Button variant="outline" size="icon">
              <Smartphone />
            </Button>
            <Button variant="outline" size="icon">
              <Eye />
            </Button>
            <Button variant="outline" size="icon">
              <Save />
            </Button>
            <Separator />
            <Button variant="default" size="icon">
              <Send />
            </Button>
          </div>
        </div> */
}
