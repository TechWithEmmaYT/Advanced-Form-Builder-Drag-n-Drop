"use client";
import React from "react";
import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SidebarProvider } from "@/components/ui/sidebar";
import Builder from "./Builder";
import BuilderDragOverlay from "./BuilderDragOverlay";

const FormBuilder = () => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 8,
    },
  });
  return (
    <div
      style={{
        backgroundColor: "#E3EDFD",
      }}
    >
      <DndContext sensors={useSensors(mouseSensor)}>
        <BuilderDragOverlay />

        <SidebarProvider
          className="h-[calc(100vh_-_64px)] "
          style={
            {
              "--sidebar-width": "300px",
              "--sidebar-height": "40px",
            } as React.CSSProperties
          }
        >
          <Builder />
        </SidebarProvider>
      </DndContext>
    </div>
  );
};

export default FormBuilder;
