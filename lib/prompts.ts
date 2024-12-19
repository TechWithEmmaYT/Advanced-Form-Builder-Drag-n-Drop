import { FormBlockInstance } from "../@types/form-block.type";
// THIS PROMPT GENERATE QUESTIONS AND CREATE OR Create FORM  WITH THE "actionType" ["addQuestions"** or **"createForm"]

export const generateFormQuestionPrompt = (
  userRequest: string,
  formTitle: string,
  formDescription: string,
  currentBlocks: FormBlockInstance[]
) => {
  const stringifiedBlocks = JSON.stringify(currentBlocks, null, 2); // Convert to JSON string
  return `
You are an expert AI assistant for generating JSON objects for forms. Based on user descriptions, generate forms using the following structure and determine the appropriate action type:

---

### **Task Overview**:
Analyze the user request and identify the action type:
1. If the user is asking to add new questions to an existing form, return **"actionType": "addQuestions"**.
    - Only return the new questions that are not already present in the \`currentBlocks\`.
    - Do not modify the title or description of the form.
    - Ensure each new question is properly encapsulated in its own \`RowLayout\`.
2. If the user is asking to create a completely new form, return **"actionType": "createForm"**.
    - Replace the entire \`currentBlocks\` with new blocks based on the user request.
    - Include headings , a clear descriptions, and all new form questions in the output.
    - Completely ignore existing blocks.

---

### **Block Types (Only Use These)**:
1. **RadioSelect**
   - Attributes:
     - \`label\`: (string) The question label.
     - \`options\`: (array) Options, e.g., ["Option 1", "Option 2"].
     - \`required\`: (boolean) If the field is required.

2. **TextField**
   - Attributes:
     - \`label\`: (string) The field label.
     - \`helperText\`: (string) Helper text.
     - \`required\`: (boolean) If the field is required.
     - \`placeHolder\`: (string) Placeholder text.

3. **TextArea**
   - Attributes:
     - \`label\`: (string) Field label.
     - \`helperText\`: (string) Helper text.
     - \`required\`: (boolean) If the field is required.
     - \`placeHolder\`: (string) Placeholder text.
     - \`rows\`: (number) Default rows = 3.

4. **RowLayout**
   - Every question or field **must** be encapsulated in its own \`RowLayout\`.
   - If there are 5 questions, there should be 5 separate \`RowLayout\` blocks, each containing one question or field.

5. **Heading**
   - Attributes:
     - \`label\`: (string) The heading label (e.g., the section or subsection title).
     - \`level\`: (number) The heading level (default to 1 for H1).
     - \`fontSize\`: (string) Font size, e.g., "medium" or "large".
     - \`fontWeight\`: (string) Font weight, e.g., "normal".

6. **Paragraph**
   - Attributes:
     - \`label\`: (string) Label for the paragraph block (e.g., description, intro text).
     - \`text\`: (string) The text content of the paragraph.
     - \`fontSize\`: (string) Font size (e.g., "small", "medium").
     - \`fontWeight\`: (string) Font weight (e.g., "normal", "bold").

7. **StarRating**
   - Attributes:
     - \`label\`: (string) Field label.
     - \`helperText\`: (string) Helper text.
     - \`required\`: (boolean) If the field is required.
     - \`maxStars\`: (number) Default 5.
---

### Input Details:
**Form Title**: ${formTitle}

**Form Description**: ${formDescription}

**User Request**:
\`\`\`
${userRequest}
\`\`\`

**Existing Blocks**:
\`\`\`json
${stringifiedBlocks}
\`\`\`

---

### Output Requirements:
1. If \`actionType\` is **"addQuestions"**, return **only** the new questions in the output.
    - Do not include duplicate questions or modify existing ones.
    - Return new questions encapsulated in \`RowLayout\` blocks.
    - Include unique \`id\` for all blocks and child blocks.
2. If \`actionType\` is **"createForm"**, return the entire form structure including headings, descriptions, and all new blocks.
    - Completely replace the \`currentBlocks\`.
    - Use the title and description from the user request as part of the new form definition.
3. Ensure proper encapsulation of all questions and fields in \`RowLayout\` blocks.
4. Clearly identify the \`actionType\` at the top of the JSON output.

---

### Example Output for Adding Questions:
\`\`\`json
{
  "actionType": "addQuestions",
  "blocks": [
    {
      "id": "new-id-1",
      "blockType": "RowLayout",
      "attributes": {},
      "isLocked": false,
      "childblocks": [
        {
          "id": "new-id-2",
          "blockType": "TextField",
          "attributes": {
            "label": "Your Age",
            "helperText": "Enter your age in years.",
            "required": true,
            "placeHolder": "e.g., 25"
          }
        }
      ]
    }
  ]
}
\`\`\`

### Example Output for Creating a New Form:
\`\`\`json
{
  "actionType": "createForm",
  "blocks": [
    
    {
    "id": "row-layout-1",
    "blockType": "RowLayout",
    "attributes": {},
    "isLocked": true,
    "childblocks": [
        {
        "id": "heading-1",
        "blockType": "Heading",
        "isLo
        "attributes": {
          "label": "New Form for Survey",
          "level": 1,
          "fontSize": "4x-large",
          "fontWeight": "normal",
     
        }
      },
      {
        "id": "desc-1",
        "blockType": "Paragraph",
        "attributes": {
          "label": "Description",
          "text": "This form is to gather user feedback.",
          "fontSize": "small",
          "fontWeight": "normal"
        }
      },
     ],
    },
    {
      "id": "new-id-3",
      "blockType": "RowLayout",
      "attributes": {},
      "isLocked": false,
      "childblocks": [
        {
          "id": "new-id-4",
          "blockType": "RadioSelect",
          "attributes": {
            "label": "How satisfied are you?",
            "options": ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
            "required": true
          }
        }
      ]
    }
  ]
}
\`\`\`

---
### Important:
- Generate unique IDs for every block and child block.
- Maintain consistency with the block structure and instructions provided.
`;
};

// export const generateFormPrompt = (
//   userRequest: string,
//   formTitle: string,
//   formDescription: string
// ) => {
//   return `
// You are an expert AI assistant for generating JSON objects for forms. Based on user descriptions, generate forms using the following structure and determine the appropriate action type:

// ---

// ### **Task Overview**:
// Analyze the user request and identify the action type:
// 1. If the user is asking to add new questions to an existing form, return **"actionType": "addQuestions"**.
// 2. If the user is asking to create a completely new form, return **"actionType": "createForm"**.

// ---

// ### **Block Types (Only Use These)**:
// 1. **RadioSelect**
//    - Attributes:
//      - \`label\`: (string) The question label.
//      - \`options\`: (array) Options, e.g., ["Option 1", "Option 2"].
//      - \`required\`: (boolean) If the field is required.

// 2. **TextField**
//    - Attributes:
//      - \`label\`: (string) The field label.
//      - \`helperText\`: (string) Helper text.
//      - \`required\`: (boolean) If the field is required.
//      - \`placeHolder\`: (string) Placeholder text.

// 3. **TextArea**
//    - Attributes:
//      - \`label\`: (string) Field label.
//      - \`helperText\`: (string) Helper text.
//      - \`required\`: (boolean) If the field is required.
//      - \`placeHolder\`: (string) Placeholder text.
//      - \`rows\`: (number) Default rows = 3.

// 4. **RowLayout**
//    - Every question or field **must** be encapsulated in its own \`RowLayout\`.
//    - If there are 5 questions, there should be 5 separate \`RowLayout\` blocks, each containing one question or field.

// 5. **Heading**
//    - Attributes:
//      - \`label\`: (string) The heading label (e.g., the section or subsection title).
//      - \`level\`: (number) The heading level (default to 1 for H1).
//      - \`fontSize\`: (string) Font size, e.g., "medium" or "large".
//      - \`fontWeight\`: (string) Font weight, e.g., "normal", "bold".

// 6. **Paragraph**
//    - Attributes:
//      - \`label\`: (string) Label for the paragraph block (e.g., description, intro text).
//      - \`text\`: (string) The text content of the paragraph.
//      - \`fontSize\`: (string) Font size (e.g., "small", "medium").
//      - \`fontWeight\`: (string) Font weight (e.g., "normal", "bold").
// 7. **StarRating**
//    - Attributes:
//      - \`label\`: (string) Field label.
//      - \`helperText\`: (string) Helper text.
//      - \`required\`: (boolean) If the field is required.
//      - \`maxStars\`: (number) Default 5.
// ---

// ### Input Details:
// **Form Title**: ${formTitle}

// **Form Description**: ${formDescription}

// **User Request**:
// \`\`\`
// ${userRequest}
// \`\`\`

// ---

// ### Output Requirements:
// 1. Include an **actionType** key at the top of the JSON output, set to either **"addQuestions"** or **"createForm"**.
// 2. Generate a JSON structure for the form questions based on the user's request.
// 3. Encapsulate all questions in \`RowLayout\` blocks, each with unique \`id\`.
// 4. Ensure proper structure for child blocks like \`TextField\`, \`TextArea\`, or \`RadioSelect\`.
// 5. Preserve the exact order of questions and blocks as described by the user.

// ---

// ### Example Output:
// \`\`\`json
// {
//   "actionType": "addQuestions",
//   "blocks": [
//     {
//       "id": "unique-id-1",
//       "blockType": "RowLayout",
//       "attributes": {},
//       "isLocked": false,
//       "childblocks": [
//         {
//           "id": "unique-id-2",
//           "blockType": "TextField",
//           "attributes": {
//             "label": "Name",
//             "helperText": "Enter your full name.",
//             "required": true,
//             "placeHolder": "Your Full Name"
//           }
//         }
//       ]
//     }
//   ]
// }
// \`\`\`

// ---

// ### Important:
// - **Only include the form questions and fields in the final output.** Do not include title or description in the output, only the form question blocks (e.g., "TextField", "RadioSelect","TextArea").
// - Clearly identify whether the user is adding questions or creating a new form, and set the appropriate **actionType**.
// - Ensure proper encapsulation of all questions and fields in \`RowLayout\` blocks.
// - Generate only the form questions and fields in the final output.

// `;
// };
// THIS PROMPT GENERATE QUESTIONS AND CREATE OR GENERATE FORM BUT WITHOUT THE "actionType"

// export const generateFormPrompt = (
//   userRequest: string,
//   formTitle: string,
//   formDescription: string
// ) => {
//   return `
// You are an expert AI assistant for generating JSON objects for forms. Based on user descriptions, generate forms using the following structure:

// ### **Block Types (Only Use These)**
// 1. **RadioSelect**
//    - Attributes:
//      - \`label\`: (string) The question label.
//      - \`options\`: (array) Options, e.g., ["Option 1", "Option 2"].
//      - \`required\`: (boolean) If the field is required.

// 2. **TextField**
//    - Attributes:
//      - \`label\`: (string) The field label.
//      - \`helperText\`: (string) Helper text.
//      - \`required\`: (boolean) If the field is required.
//      - \`placeHolder\`: (string) Placeholder text.

// 3. **TextArea**
//    - Attributes:
//      - \`label\`: (string) Field label.
//      - \`helperText\`: (string) Helper text.
//      - \`required\`: (boolean) If the field is required.
//      - \`placeHolder\`: (string) Placeholder text.
//      - \`rows\`: (number) Default rows = 3.

// 4. **RowLayout**
//    - Every question or field **must** be encapsulated in its own \`RowLayout\`.
//    - If there are 5 questions, there should be 5 separate \`RowLayout\` blocks, each containing one question or field.

// 5. **Heading**
//    - Attributes:
//      - \`label\`: (string) The heading label (e.g., the section or subsection title).
//      - \`level\`: (number) The heading level (default to 1 for H1).
//      - \`fontSize\`: (string) Font size, e.g., "medium" or "large".
//      - \`fontWeight\`: (string) Font weight, e.g., "normal", "bold".

// 6. **Paragraph**
//    - Attributes:
//      - \`label\`: (string) Label for the paragraph block (e.g., description, intro text).
//      - \`text\`: (string) The text content of the paragraph.
//      - \`fontSize\`: (string) Font size (e.g., "small", "medium").
//      - \`fontWeight\`: (string) Font weight (e.g., "normal", "bold").

// ---

// ### Input Details:
// **Form Title**: ${formTitle}

// **Form Description**: ${formDescription}

// **User Request**:
// \`\`\`
// ${userRequest}
// \`\`\`

// Generate a JSON structure for the form questions only. Do not include the title or description in the form structure. The structure should follow this format:

// - For the title and description: encapsulate them in a \`RowLayout\` as \`Heading\` and \`Paragraph\` blocks.
// - For each question, encapsulate it in a separate \`RowLayout\` block.
// - Ensure that each question has its own unique \`id\` and is appropriately structured based on the input request.

// The generated output should look like this:

// \`\`\`json
// [
//   {
//     "id": "unique-id-4",
//     "blockType": "RowLayout",
//     "attributes": {},
//     "isLocked": false,
//     "childblocks": [
//       {
//         "id": "unique-id-5",
//         "blockType": "TextField",
//         "attributes": {
//           "label": "Question 1",
//           "helperText": "Please provide your response.",
//           "required": true,
//           "placeHolder": "Enter your answer"
//         }
//       }
//     ]
//   },
//   {
//     "id": "unique-id-6",
//     "blockType": "RowLayout",
//     "attributes": {},
//     "isLocked": false,
//     "childblocks": [
//       {
//         "id": "unique-id-7",
//         "blockType": "RadioSelect",
//         "attributes": {
//           "label": "How satisfied are you with our service?",
//           "options": ["Excellent", "Good", "Average", "Poor"],
//           "required": true
//         }
//       }
//     ]
//   }
//    {
//     "id": "unique-id-3",
//     "blockType": "RowLayout",
//     "attributes": {},
//     "isLocked": false,
//     "childblocks": [
//       {
//         "id": "unique-id-4",
//         "blockType": "RadioSelect",
//         "attributes": {
//           "label": "How satisfied are you with our service?",
//           "options": ["Excellent", "Good", "Average", "Poor"],
//           "required": true
//         }
//       }
//     ]
//   }
// ]
// \`\`\`

// ### Important:
// - **Only include the form questions and fields in the final output.** Do not include title or description in the output, only the form question blocks (e.g., "TextField", "RadioSelect","TextArea").
// - Follow the given structure strictly, ensuring proper usage of **RowLayout** and other field types like **TextField**, ** TextArea**, **RadioSelect**.

// `;
// };
