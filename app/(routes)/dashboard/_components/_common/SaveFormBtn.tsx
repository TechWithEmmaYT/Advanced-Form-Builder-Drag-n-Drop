"use client";
import React, { useState } from "react";
import { Loader, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuilder } from "@/context/builder-provider";
import { UpdateForm } from "@/actions/form.action";
import { useParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const SaveFormBtn = () => {
  const params = useParams();
  const formId = params.formId as string;

  const { blocks } = useBuilder();

  const [isLoading, setIsLoading] = useState(false);

  const updateForm = async () => {
    try {
      setIsLoading(true);
      const lockedBlock = blocks.find((block) => block.isLocked);
      const name = lockedBlock?.childblocks?.find(
        (child) => child.blockType === "Heading"
      )?.attributes?.label as string;

      const description = lockedBlock?.childblocks?.find(
        (child) => child.blockType === "Paragraph"
      )?.attributes?.text as string;

      const jsonBlocks = JSON.stringify(blocks);
      //   console.log(name, "name");
      //   console.log(description, "description");
      //   console.log(jsonBlocks, "jsonBlocks");
      const response = await UpdateForm({
        formId,
        name,
        description,
        jsonBlocks,
      });
      if (response?.success) {
        toast({
          title: "Success",
          description: response.message,
        });
      } else {
        toast({
          title: "Error",
          description: response?.message || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isLoading}
      className="bg-transparent !text-primary !border-primary"
      onClick={updateForm}
    >
      <Save /> Save
      {isLoading && <Loader className="w-4 h-4 animate-spin" />}
    </Button>
  );
};

export default SaveFormBtn;
