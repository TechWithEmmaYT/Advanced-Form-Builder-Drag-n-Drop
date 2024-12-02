"use client";
import React from "react";
import { BuilderSidebar } from "./BuilderSidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import BuilderCanvas from "./BuilderCanvas";
import BuilderBlockProperties from "./BuilderBlockProperties";
import { useBuilder } from "@/context/builder-provider";
import FloatingShareButton from "./_common/FloatingShareButton";

const Builder = (props: { isSidebarOpen: boolean }) => {
  const { formData } = useBuilder();

  return (
    <>
      <BuilderSidebar />
      <SidebarInset className="!p-0 flex-1">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: formData?.settings?.backgroundColor || "#E3EDFD",
          }}
        >
          <SidebarTrigger className=" absolute top-0 z-50" />
          <BuilderCanvas />
          <FloatingShareButton isSidebarOpen={props.isSidebarOpen} />
        </div>
      </SidebarInset>
      <BuilderBlockProperties />
    </>
  );
};

export default Builder;
