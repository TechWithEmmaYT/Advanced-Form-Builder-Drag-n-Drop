import {
  FormBlock,
  FormBlockInstance,
  FormBlockType,
  FormCategoryType,
  HandleBlurFunc,
} from "@/@types/form-block.type";
import { Star, StarIcon } from "lucide-react";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";

const blockType: FormBlockType = "StarRating";
const blockCategory: FormCategoryType = "Form";

type attributesType = {
  label: string;
  helperText: string;
  required: boolean;
  maxStars: string;
};

export const StarRatingBlock: FormBlock = {
  blockType,
  blockCategory, // Specify the category (e.g., "Input" or "Feedback")
  createInstance: (id: string) => ({
    id,
    blockType: "StarRating",
    attributes: {
      label: "Star Rating",
      helperText: "",
      maxStars: 5, // Default to 5 stars
      required: false,
    },
  }),
  blockBtnElement: {
    icon: StarIcon, // Replace with your star icon
    label: "Star Rating",
  },
  canvasComponent: StarRatingCanvasComponent,
  formComponent: StarRatingFormComponent,
  propertiesComponent: StarRatingPropertiesComponent,
};

type NewInstance = FormBlockInstance & {
  attributes: attributesType;
};

function StarRatingCanvasComponent({
  blockInstance,
}: {
  blockInstance: FormBlockInstance;
}) {
  const block = blockInstance as any; // Assuming the instance is of a type like NewInstance
  const { label, required, maxStars, value, helperText } = block.attributes; // Destructure attributes

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <div className="flex flex-col gap-1 items-center" key={i}>
          <span className="stroke-gray-600">{i}</span>
          <Star
            size="2rem"
            className={`cursor-default pointer-events-none !stroke-[1] stroke-primary ${
              i <= value ? "!fill-primary" : "!fill-white"
            }`}
          />
        </div>
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-base !font-normal mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center gap-10 justify-center">
        {renderStars()}
      </div>
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}

function StarRatingFormComponent({
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
  const block = blockInstance as any;
  const { label, required, maxStars, value } = block.attributes;

  const [rating, setRating] = useState(value || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isError, setIsError] = useState(false);

  const handleMouseOver = (index: number) => {
    setHoveredRating(index + 1); // 1-indexed rating
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  // Function to handle changes in rating
  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      setRating((prevRating: number) => Math.min(prevRating + 1, maxStars));
    } else if (event.key === "ArrowLeft") {
      setRating((prevRating: number) => Math.max(prevRating - 1, 1)); // Ensure at least 1 star is selected
    }
  };

  // Function to validate the field
  const validateField = () => {
    if (required) {
      return rating > 0;
    }
    return true;
  };

  useEffect(() => {
    if (handleBlur) {
      handleBlur(blockInstance.id, rating);
    }
  }, [rating, handleBlur, blockInstance.id]);

  return (
    <div className="flex flex-col gap-2 w-full mb-1">
      <Label
        className={`text-base !font-normal mb-1 ${
          isError || isSubmitError ? "text-red-500" : ""
        }`}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <div
        className="flex items-center gap-10 justify-center"
        onMouseLeave={handleMouseLeave}
      >
        {/* Render stars */}
        {[...Array(maxStars)].map((_, index) => (
          <div className="flex flex-col gap-1 items-center" key={index}>
            <span className="stroke-gray-600">{index + 1}</span>
            <button
              onMouseOver={() => handleMouseOver(index)}
              onClick={() => handleStarClick(index)}
            >
              <Star
                size="2rem"
                className={`cursor-pointer  !stroke-[1] stroke-primary  ${
                  index <= rating ? "fill-primary/80" : "!fill-white"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
      {isError || isSubmitError ? (
        <p className="text-red-500 text-[0.8rem]">
          {required && rating === 0 ? "This field is required." : ""}
        </p>
      ) : (
        errorMessage && (
          <p className="text-red-500 text-[0.8rem]">{errorMessage}</p>
        )
      )}
    </div>
  );
}

function StarRatingPropertiesComponent({
  positionIndex,
  parentId,
  blockInstance,
}: {
  positionIndex?: number;
  parentId?: string;
  blockInstance: FormBlockInstance;
}) {
  return <></>;
}
