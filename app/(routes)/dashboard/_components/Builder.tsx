"use client";
import React from "react";
import { BuilderSidebar } from "./BuilderSidebar";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import BuilderCanvas from "./BuilderCanvas";
import BuilderBlockProperties from "./BuilderBlockProperties";

const Builder = () => {
  return (
    <>
      <BuilderSidebar formName="Name" />
      <SidebarInset className="!p-0 flex-1">
        <div
          className="w-full h-full"
          style={{
            backgroundColor: "#E3EDFD",
          }}
        >
          <SidebarTrigger className=" absolute top-0 z-50" />
          <BuilderCanvas />
        </div>
      </SidebarInset>
      <BuilderBlockProperties />
    </>
  );
};

export default Builder;
