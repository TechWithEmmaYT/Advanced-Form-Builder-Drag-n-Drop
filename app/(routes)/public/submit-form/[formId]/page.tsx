import React from "react";
import { fetchPublishFormById } from "@/actions/form.action";
import FormSubmitComponent from "../../_components/FormSubmitComponent";
import { FormBlockInstance } from "@/@types/form-block.type";
import { defaultBackgroundColor } from "@/constant";

const Page = async ({ params }: { params: { formId: string } }) => {
  const { formId } = params;
  const { form } = await fetchPublishFormById(formId);

  if (!form) {
    return <div>Error Occurred, reload</div>;
  }

  const blocks = JSON.parse(form.jsonBlocks) as FormBlockInstance[];

  return (
    <div
      className="w-full min-h-screen"
      style={{
        backgroundColor:
          form?.settings?.backgroundColor || defaultBackgroundColor,
      }}
    >
      <FormSubmitComponent formId={formId} blocks={blocks} />;
    </div>
  );
};

export default Page;
