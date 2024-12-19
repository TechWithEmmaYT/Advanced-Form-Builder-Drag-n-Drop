"use client";

import React, { useState } from "react";
import { Loader, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { AIChatSession } from "@/lib/google-ai";
import { useBuilder } from "@/context/builder-provider";
import { toast } from "@/hooks/use-toast";
import { generateUniqueId } from "@/lib/helper";
import { FormBlockInstance } from "@/@types/form-block.type";
import { generateFormQuestionPrompt } from "@/lib/prompts";

const AIAssistanceBtn = () => {
  const { formData, setBlocks, blocks } = useBuilder();

  const [userRequest, setUserRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const GenerateFormQuestionsWithAI = async () => {
    try {
      setLoading(true);
      const formName = formData?.name || "";
      const formDescription = formData?.description || "";
      // const PROMPT: string = generateFormPrompt(
      //   userRequest,
      //   formName,
      //   formDescription
      // );

      const PROMPT: string = generateFormQuestionPrompt(
        userRequest,
        formName,
        formDescription,
        blocks
      );
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      const parsedResponse = JSON?.parse(responseText);
      const actionType = parsedResponse.actionType;
      const generatedBlocks = parsedResponse.blocks;
      const addUniqueIdToGeneratedBlocks = addUniqueIds(generatedBlocks);
      //console.log(addUniqueIdToResponse);

      setBlocks((prevBlocks) => {
        if (actionType === "addQuestions") {
          // Append the new blocks to the existing ones
          return [...prevBlocks, ...addUniqueIdToGeneratedBlocks];
        } else if (actionType === "createForm") {
          // Remove all existing blocks except those with `isLocked: true`
          //const lockedBlocks = prevBlocks.filter((block) => block.isLocked);
          return [...addUniqueIdToGeneratedBlocks];
        } else {
          console.warn(`Unhandled actionType: ${actionType}`);
          return prevBlocks; // If actionType is unknown, return the existing blocks without changes
        }
      });
      //setBlocks((prev) => [...prev, ...addUniqueIdToResponse]);
      setIsOpen(false);
      setUserRequest("");
    } catch (error) {
      console.log(error, "error");
      toast({
        title: "Failed to generate summary",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  function addUniqueIds(formData: FormBlockInstance[]) {
    formData.forEach((block, index) => {
      block.id = generateUniqueId();
      // For each childblock, add unique ID
      block?.childblocks?.forEach((child) => {
        child.id = generateUniqueId();
      });
    });
    return formData;
  }

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="rounded-lg !bg-primary/20 border-none p-4 shadow-sm"
            aria-label="Copy Shareable Link"
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          forceMount
          align="start"
          side="right"
          //sideOffset={480}
        >
          <div className="flex flex-col  w-[390px] bg-white border-2 border-purple-200 rounded-lg px-5  pb-[14px] pt-[18px] shadow-xl">
            <div className="flex relative">
              <div
                className="pb-5 sm:pb-0 flex w-full overflow-x-auto overflow-y-hidden scrollbar-hide 
              border-b border-gray-200"
              >
                <div className="block mx-4 !ml-0">
                  <nav className="flex space-x-6 -mb-px">
                    <a className="inline-flex items-center px-1 pb-2 text-xs font-medium text-primary border-b-2">
                      Ask to generate form or questions
                    </a>
                  </nav>
                </div>
              </div>
              <div className="flex absolute top-0 right-0  -mt-[6px] whitespace-nowrap text-xs py-1 px-[6px] bg-gray-100 rounded-md text-gray-600">
                Beta
              </div>
            </div>
            <div className="mt-[22px]">
              <Textarea
                value={userRequest}
                rows={4}
                className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md focus:ring-primary"
                placeholder="Describe the questions you want to add with AI..."
                spellCheck="false"
                onChange={(e) => {
                  setUserRequest(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div
                role="button"
                className=" text-purple-400 font-medium underline text-sm ml-1"
                onClick={() => setShow(!show)}
              >
                {show ? "Hide tips" : "Tips"}
              </div>
              <Button
                type="button"
                size="sm"
                className="!px-3 !font-medium !py-2"
                disabled={loading}
                onClick={GenerateFormQuestionsWithAI}
              >
                <Sparkles />
                Generate
                {loading && <Loader size="15px" className="animate-spin" />}
              </Button>
            </div>
            {show && (
              <div className="flex flex-col rounded border border-purple-300 bg-purple-100 text-purple-500 px-3 pt-3 mt-2 mb-1">
                <div className="flex font-semibold text-sm mb-1">
                  Let the AI know:
                </div>
                <ul className="tips-options text-sm mx-4 space-y-2 pb-2">
                  <li>
                    What Form you want it create (e.g Create a booking form for
                    our hotel)?
                  </li>
                  <li>
                    What information you'd like to collect (e.g. email, name,
                    description)
                  </li>

                  <li>
                    What tone would you like the questions in (e.g. formal,
                    informal)?
                  </li>
                  <li>How many questions do you want to ask?</li>
                </ul>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AIAssistanceBtn;
