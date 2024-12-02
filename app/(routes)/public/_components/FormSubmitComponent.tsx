"use client";
import React, { useRef } from "react";
import { FormBlockInstance, FormBlocks } from "@/@types/form-block.type";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

const FormSubmitComponent = (props: {
  formId: string;
  blocks: FormBlockInstance[];
}) => {
  const { blocks } = props;

  const formVals = useRef<{ [key: string]: string }>({});

  const handleChange = (key: string, value: string) => {
    formVals.current[key] = value;
  };

  const handleSubmit = () => {
    console.log("onSubmitForm", formVals.current);
  };
  return (
    <div className="scrollbar w-full h-full overflow-y-auto  transition-all duration-300">
      <div className="w-full h-full max-w-[650px] mx-auto">
        <div
          className="w-full relative bg-transparent px-2
               flex flex-col items-center justify-start pt-1 pb-14"
        >
          <div
            className="w-full mb-3
             bg-white bg-[url(/images/form-bg.jpg)] bg-center bg-cover border shadow-sm h-[135px] max-w-[768px]
          rounded-md px-1"
          />
          <div>
            {blocks.length > 0 && (
              <div className="flex flex-col w-full gap-4">
                {blocks.map((block) => {
                  const FormBlockComponent =
                    FormBlocks[block.blockType].formComponent;
                  return (
                    <FormBlockComponent
                      key={`public-${block.id}`}
                      blockInstance={block}
                      handleChange={handleChange}
                    />
                  );
                })}
                <div className="w-full flex items-center justify-between">
                  <Button className="!bg-primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button
                    variant="ghost"
                    className="!text-primary"
                    onClick={() => {
                      formVals.current = {};
                    }}
                  >
                    Clear form
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center flex-col gap-2 justify-center mt-5">
            <p className="text-xs ">Never submit passwords through Formy.ai.</p>
            <Logo url="#" color="!text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
