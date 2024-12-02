import React from "react";
import { Separator } from "@/components/ui/separator";
import AllReponds from "../../../_components/AllReponds";
import VisitLink from "../../../_components/_common/VisitLink";

const Responds = async ({ params }: { params: { formId: string } }) => {
  const { formId } = params;
  // { params }: { params: { formId: string } }
  // const { form } = await fetchFormById(formId);

  return (
    <main>
      <div className="w-full  pt-8">
        <div className="w-full max-w-6xl mx-auto pt-1">
          <div className="w-full flex items-center justify-between py-5">
            <h1 className="text-3xl font-semibold tracking-tight">
              567 Responses
            </h1>
            <VisitLink formId={formId} />
          </div>

          <div className="mt-10">
            <Separator className="!border-[#eee] !bg-[#eee]" />
            <AllReponds />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Responds;
