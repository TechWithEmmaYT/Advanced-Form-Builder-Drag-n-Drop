"use client";
import React, { useState } from "react";
import { Loader, PlusIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createForm } from "@/actions/form.action";
import { toast } from "@/hooks/use-toast";

const CreateForm = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    description: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await createForm({
      name: values.name,
      description: values.description,
    });
    if (response?.success) {
      setIsOpen(false);
      toast({
        title: "Success",
        description: "Form created successfully",
      });
      router.push(`/dashboard/form/builder/${response.form?.formId}`);
    } else {
      toast({
        title: "Error",
        description: response?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="!bg-[#2d31fa] !font-medium">
            <PlusIcon />
            Create a form
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <div className="w-full max-w-5xl mx-auto">
            <SheetHeader>
              <SheetTitle>Create New Form</SheetTitle>
              <SheetDescription>
                This will create a new form. Ensure all details are accurate.
              </SheetDescription>
            </SheetHeader>
            <div className="w-full dialog-content">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            placeholder="Form name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Form description" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="flex px-5 place-self-end !bg-[#2d31fa]"
                  >
                    {form.formState.isSubmitting && (
                      <Loader className="w-4 h-4 animate-spin" />
                    )}
                    Create
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateForm;
