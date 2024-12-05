"use client";

import { FormBlockInstance } from "@/@types/form-block.type";
import { FormWithSettings } from "@/@types/form.type";
import { fetchFormById } from "@/actions/form.action";
import { generateUniqueId } from "@/lib/helper";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type BulderContextType = {
  loading: boolean;
  formData: FormWithSettings | null;
  setFormData: React.Dispatch<React.SetStateAction<FormWithSettings | null>>;

  blocks: FormBlockInstance[];
  setBlocks: React.Dispatch<React.SetStateAction<FormBlockInstance[]>>;
  addBlock: (block: FormBlockInstance) => void;
  updateBlockLayout: (id: string, childrenBlocks: FormBlockInstance[]) => void;

  removeBlockLayout: (id: string) => void;
  duplicateBlockLayout: (id: string) => void;

  updateChildBlock: (
    parentId: string,
    id: string,
    block: FormBlockInstance
  ) => void;

  insertBlockLayoutAtIndex: (
    targetBlockId: string,
    block: FormBlockInstance,
    position: "above" | "below"
  ) => void;

  selectedBlockLayout: FormBlockInstance | null;
  handleSelectedLayout: (blockLayout: FormBlockInstance | null) => void;

  repositionBlockLayout: (
    activeId: string,
    overId: string,
    position: "above" | "below"
  ) => void;
};

export const BuilderContext = createContext<BulderContextType | null>(null);

export default function BuilderContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const formId = params.formId as string;

  console.log("formId", formId);

  const [formData, setFormData] = useState<FormWithSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const [blocks, setBlocks] = useState<FormBlockInstance[]>([]);

  const [selectedBlockLayout, setSeletedBlockLayout] =
    useState<FormBlockInstance | null>(null);

  useEffect(() => {
    console.log("Inside context useEffect", formId);
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!formId) return;
        const { form } = await fetchFormById(formId);
        if (form) {
          console.log(form, "form useeffect");

          setFormData(form);
          // Parse `blocks` from the form's `jsonBlocks`
          if (form.jsonBlocks) {
            const parsedBlocks = JSON.parse(form.jsonBlocks);
            setBlocks(parsedBlocks);
          }
        }
      } catch (error) {
        console.error("Error fetching form:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, [formId]);

  const addBlock = (block: FormBlockInstance) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks.push(block);
      return newBlocks;
    });
  };

  // B.S -> UPDATE BLOCK ROW LAYOUT
  const updateBlockLayout = (
    id: string,
    childrenBlocks: FormBlockInstance[]
  ) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, childblocks: childrenBlocks } : block
      )
    );
  };

  // B.S -> DUPLICATE BLOCK ROW LAYOUT

  const duplicateBlockLayout = (id: string) => {
    setBlocks((prevBlocks) => {
      const blockToDuplicate = prevBlocks.find((block) => block.id === id);
      if (!blockToDuplicate) return prevBlocks; // If block not found, return the original state
      // Deep clone the block and generate a new id
      const duplicatedBlock = {
        ...blockToDuplicate,
        id: generateUniqueId(), // Use a unique ID generator function
        blocks: blockToDuplicate.childblocks?.map((childBlock) => ({
          ...childBlock,
          id: generateUniqueId(), // Ensure child blocks also get new IDs
        })),
      };
      // Add the duplicated block after the original block
      const newBlocks = [...prevBlocks];
      const insertIndex = prevBlocks.findIndex((block) => block.id === id) + 1;
      newBlocks.splice(insertIndex, 0, duplicatedBlock);

      return newBlocks;
    });
  };

  // B.S -> REMOVE BLOCK ROW LAYOUT
  const removeBlockLayout = (id: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
    if (selectedBlockLayout?.id === id) setSeletedBlockLayout(null);
  };

  // B.S -> SELECT BLOCK ROW LAYOUT
  const handleSelectedLayout = (block: FormBlockInstance | null) => {
    if (formData?.published) {
      setSeletedBlockLayout(null);
      return;
    }
    setSeletedBlockLayout(block);
  };

  // B.S -> UPDATE ROW LAYOUT CHILD BLOCK
  const updateChildBlock = (
    parentId: string,
    id: string,
    updatedBlock: FormBlockInstance
  ) => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = prevBlocks.map((parentBlock) => {
        if (parentBlock.id === parentId) {
          const updatedChildren = parentBlock.childblocks?.map((childBlock) =>
            childBlock.id === id
              ? { ...childBlock, ...updatedBlock }
              : childBlock
          );
          return { ...parentBlock, childblocks: updatedChildren };
        }
        return parentBlock;
      });
      return updatedBlocks; // Update the entire blocks array
    });
  };

  // B.S -> INSERT NEW ROW LAYOUT IN A PARTICULAR INDEX ON CANVAS
  const insertBlockLayoutAtIndex = (
    targetBlockId: string,
    newBlock: FormBlockInstance,
    position: "above" | "below" = "below" // Default to "below"
  ) => {
    setBlocks((prev) => {
      const targetIndex = prev.findIndex((block) => block.id === targetBlockId);
      if (targetIndex === -1) {
        console.warn(`Block with ID ${targetBlockId} not found.`);
        return prev; // If the target ID doesn't exist, return the current state
      }
      const insertIndex = position === "above" ? targetIndex : targetIndex + 1;
      const updatedBlocks = [...prev];
      updatedBlocks.splice(insertIndex, 0, newBlock);
      return updatedBlocks;
    });
  };

  // B.S -> REPOSTION BLOCK ROW LAYOUT
  const repositionBlockLayout = (
    activeId: string,
    overId: string,
    position: "above" | "below"
  ) => {
    setBlocks((prev) => {
      // Find the indices of the active and over blocks
      const activeIndex = prev.findIndex((block) => block.id === activeId);
      const overIndex = prev.findIndex((block) => block.id === overId);

      if (activeIndex === -1 || overIndex === -1) {
        console.warn("Active or Over block not found.");
        return prev;
      }
      // Remove the active block from its current position
      const updatedBlocks = [...prev];
      const [movedBlock] = updatedBlocks.splice(activeIndex, 1);
      // Calculate the new position for insertion
      const insertIndex = position === "above" ? overIndex : overIndex + 1;
      // Insert the moved block at the calculated position
      updatedBlocks.splice(insertIndex, 0, movedBlock);

      return updatedBlocks;
    });
  };

  return (
    <BuilderContext.Provider
      value={{
        loading,
        formData,
        setFormData,
        blocks,
        setBlocks,
        addBlock,
        updateBlockLayout,
        removeBlockLayout,
        duplicateBlockLayout,
        selectedBlockLayout,
        handleSelectedLayout,
        updateChildBlock,
        insertBlockLayoutAtIndex,
        repositionBlockLayout,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);

  if (!context) {
    throw new Error("Use Context inside the provider");
  }
  return context;
}

// {
//     id: "row-block-67890",
//     blockType: "RowLayout",
//     attributes: {},
//     isLocked: true,
//     childblocks: [
//       {
//         id: "heading-block-33445",
//         blockType: "Heading",
//         attributes: {
//           label: "Untitled form",
//           level: 1, // Default to H1
//           fontSize: "4x-large",
//           fontWeight: "normal",
//         },
//       },
//       {
//         id: "paragraph-block-12345",
//         blockType: "Paragraph",
//         attributes: {
//           label: "Paragraph",
//           text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis sem odio. Sed commodo vestibulum leo.",
//           fontSize: "small",
//           fontWeight: "normal",
//         },
//       },
//     ],
//   },
