"use client";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import React, { useEffect, useState } from "react";

const VisitLink = ({ formId }: { formId: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  const shareableLink = `${window.location.origin}/form/public/${formId}/viewform`;
  return (
    <a href={shareableLink} target="_blank">
      <Button className="w-full max-w-44 !bg-primary">
        <Link />
        Visit Link
      </Button>
    </a>
  );
};

export default VisitLink;
