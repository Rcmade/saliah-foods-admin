import { Eye } from "lucide-react";
import React from "react";

const HidePassword = ({
  elementRef,
  className,
}: {
  elementRef: HTMLInputElement;
  className?: string;
}) => {
  return (
    <div className="absolute top-[45%] right-1">
      <Eye />
    </div>
  );
};

export default HidePassword;
