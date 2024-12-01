import React from "react";
import { fetchFormById } from "@/actions/form.action";
import FormBuilder from "../../../_components/FormBuilder";

const Builder = async ({
  params,
}: {
  params: {
    formId: string;
  };
}) => {
  const { formId } = params;
  const { form } = await fetchFormById(formId);

  return <FormBuilder />;
};

export default Builder;
