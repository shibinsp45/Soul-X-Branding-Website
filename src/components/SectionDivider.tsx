import React from "react";

const SectionDivider = () => {
  return (
    <div className="relative w-full flex items-center justify-center py-2 md:py-4">
      <div className="w-full max-w-xs mx-auto flex items-center gap-3">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="w-1 h-1 rounded-full bg-border" />
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </div>
  );
};

export default SectionDivider;
