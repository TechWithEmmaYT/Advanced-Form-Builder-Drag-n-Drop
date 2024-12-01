import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full flex h-56 items-center justify-center">
      <div>
        <Loader size="3rem" className="animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
