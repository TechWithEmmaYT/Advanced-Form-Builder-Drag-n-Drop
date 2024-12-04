import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ChevronDown, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  FormBlock,
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  HandleBlurFunc,
} from "@/@types/form-block.type";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useBuilder } from "@/context/builder-provider";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { generateSixUniqueNo } from "@/lib/helper";

const blockType: FormBlockType = "RadioSelect";
const blockCategory: FormCategoryType = "Form";

type attributesType = {
  label: string;
  options: string[];
  required: boolean;
};

type propertiesValidateSchemaType = z.infer<typeof propertiesValidateSchema>;

const propertiesValidateSchema = z.object({
  label: z.string().trim().min(2).max(255),
  required: z.boolean().default(false),
  options: z.array(z.string().min(1)),
});

export const RadioSelectBlock: FormBlock = {
  blockType,
  blockCategory,
  createInstance: (id: string) => ({
    id,
    blockType,
    attributes: {
      label: "Select an option",
      options: ["Option 1", "Option 2"], // Default options
      required: false,
    },
  }),
  blockBtnElement: {
    icon: CircleIcon,
    label: "Radio",
  },
  canvasComponent: RadioSelectCanvasComponent, // Renders the heading block on the canvas
  formComponent: RadioSelectFormComponent, // Customize as needed
  propertiesComponent: RadioSelectPropertiesComponent, // Properties editor
};

type NewInstance = FormBlockInstance & {
  attributes: attributesType;
};

function RadioSelectCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const block = blockInstance as NewInstance;
  const { label, options, required } = block.attributes;
  return (
    <div className="flex flex-col gap-3 w-full">
      <Label className="text-base !font-normal mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <RadioGroup
        disabled
        className="space-y-3 disabled:cursor-default !pointer-events-none !cursor-default"
      >
        {options.map((option: string, index: number) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem disabled value={option} id={option} />
            <Label htmlFor={option} className="font-normal">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

function RadioSelectFormComponent({
  blockInstance,
  handleBlur,
  isError: isSubmitError,
  errorMessage,
}: {
  blockInstance: FormBlockInstance;
  handleBlur?: HandleBlurFunc;
  isError?: boolean;
  errorMessage?: string;
}) {
  const block = blockInstance as NewInstance;
  const { label, options, required } = block.attributes;

  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);

  const validateField = (val: string) => {
    if (required) {
      return val.trim().length > 0; // Validation: Required fields must not be empty.
    }
    return true; // If not required, always valid.
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label
        className={`text-base !font-normal mb-2 ${
          isError || isSubmitError ? "text-red-500" : ""
        }`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <RadioGroup
        value={value}
        onValueChange={(value) => {
          setValue(value);
          const isValid = validateField(value);
          setIsError(!isValid); // Set error state based on validation.
          if (handleBlur) {
            handleBlur(block.id, value);
          }
        }}
        onBlur={(event) => {}}
        className={`space-y-3`}
      >
        {options.map((option: string, index: number) => {
          const uniqueId = `option-${generateSixUniqueNo()}`;
          return (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option}
                id={uniqueId}
                className={`!cursor-pointer ${
                  isError || isSubmitError ? "!border-red-500" : ""
                }`}
              />
              <Label htmlFor={uniqueId} className="font-normal !cursor-pointer">
                {option}
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      {isError ? (
        <p className="text-red-500 text-[0.8rem]">
          {required && value.trim().length === 0
            ? `This field is required.`
            : ""}
        </p>
      ) : (
        errorMessage && (
          <p className="text-red-500 text-[0.8rem]">{errorMessage}</p>
        )
      )}
    </div>
  );
}

function RadioSelectPropertiesComponent({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) {
  const block = blockInstance as NewInstance; // Cast blockInstance to CustomInstance
  const { updateChildBlock } = useBuilder();

  // Define form schema and validation
  const form = useForm<propertiesValidateSchemaType>({
    resolver: zodResolver(propertiesValidateSchema),
    defaultValues: {
      label: block.attributes.label,
      required: block.attributes.required,
      options: block.attributes.options || [],
    },
    mode: "onBlur",
  });

  // Reset form values when block attributes change
  useEffect(() => {
    form.reset({
      label: block.attributes.label,
      required: block.attributes.required,
      options: block.attributes.options || [],
    });
  }, [block.attributes, form]);

  // Function to update block attributes
  function setChanges(values: propertiesValidateSchemaType) {
    if (!parentId) return null;

    updateChildBlock(parentId, block.id, {
      ...block,
      attributes: {
        ...block.attributes,
        ...values,
      },
    });
  }

  return (
    <div className="w-full pb-4">
      <div className="w-full flex flex-row items-center justify-between gap-1 bg-gray-100 h-auto p-1 px-2 mb-[10px]">
        <span className="text-sm font-medium text-gray-600 tracking-wider">
          Radio {positionIndex}
        </span>
        <ChevronDown className="w-4 h-4" />
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full space-y-3 px-4"
        >
          {/* Label Field */}
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem className="text-end">
                <div className="flex items-baseline justify-between w-full gap-2">
                  <FormLabel className="text-[13px] font-normal">
                    Label
                  </FormLabel>
                  <div className="w-full max-w-[187px]">
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setChanges({
                            ...form.getValues(),
                            label: e.target.value,
                          });
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") event.currentTarget.blur();
                        }}
                      />
                    </FormControl>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Options Field */}
          <FormField
            control={form.control}
            name="options"
            render={({ field }) => (
              <FormItem className="text-end">
                <div className="flex items-baseline justify-between w-full gap-2">
                  <FormLabel className="text-[13px] font-normal">
                    Options
                  </FormLabel>
                  <div className="flex flex-col gap-1">
                    {field?.value?.map((option: string, index: number) => (
                      <div
                        key={index}
                        className="relative flex items-center justify-between gap-2"
                      >
                        <Input
                          value={option}
                          onChange={(e) => {
                            const updatedOptions = [...(field?.value || [])];
                            updatedOptions[index] = e.target.value;
                            field.onChange(updatedOptions);
                            setChanges({
                              ...form.getValues(),
                              options: updatedOptions,
                            });
                          }}
                          className="max-w-[187px]"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="!p-0 absolute -right-1 -top-1 !bg-black rounded-full w-4 h-4"
                          onClick={() => {
                            const updatedOptions = field.value?.filter(
                              (_, i) => i !== index
                            );
                            field.onChange(updatedOptions);
                            setChanges({
                              ...form.getValues(),
                              options: updatedOptions,
                            });
                          }}
                        >
                          <X color="white" className="!w-2.5 !h-2.5" />
                        </Button>
                      </div>
                    ))}

                    <FormMessage />

                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      size="sm"
                      onClick={() => {
                        const currentOptions = field?.value || [];
                        const newOption = `Option ${currentOptions.length + 1}`;
                        const updatedOptions = [...currentOptions, newOption];
                        field.onChange(updatedOptions);
                        setChanges({
                          ...form.getValues(),
                          options: updatedOptions,
                        });
                      }}
                    >
                      Add Option
                    </Button>
                  </div>
                </div>
              </FormItem>
            )}
          />

          {/* Required Field */}
          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem className="text-end">
                <div className="flex items-center justify-between w-full gap-2">
                  <FormLabel className="text-[13px] font-normal">
                    Required
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(value);
                        setChanges({
                          ...form.getValues(),
                          required: value,
                        });
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
