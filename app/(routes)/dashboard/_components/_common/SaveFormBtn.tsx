"use client";
import React, { useState } from "react";
import { Loader, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuilder } from "@/context/builder-provider";
import { UpdateForm } from "@/actions/form.action";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const SaveFormBtn = () => {
  const { formData, setFormData } = useBuilder();
  const formId = formData?.formId;

  const { blocks } = useBuilder();

  const [isLoading, setIsLoading] = useState(false);

  const saveForm = async () => {
    try {
      if (!formId) return;

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

        if (response.form)
          setFormData({
            ...formData,
            ...response.form,
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
      disabled={isLoading || formData?.published}
      className={cn(
        "!text-primary !bg-primary/10 !border-primary",
        formData?.published ? "cursor-default pointer-events-none" : ""
      )}
      onClick={saveForm}
    >
      {isLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Save />}
      Save
    </Button>
  );
};

export default SaveFormBtn;
