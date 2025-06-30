"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type AnalyticsControlsProps = {
  onRangeOffsetChange: (offsetDelta: number) => void;
  onUnitChange: (unit: "week" | "month") => void;
  rangeLabel: string;
  unit: "week" | "month";
  canGoNext: boolean; // to disable "next" button if at current range
};

const AnalyticsControls: React.FC<AnalyticsControlsProps> = ({
  onRangeOffsetChange,
  onUnitChange,
  rangeLabel,
  unit,
  canGoNext,
}) => {
  return (
    <div className="flex items-center justify-between w-full mb-6">
      {/* Date navigation */}
      <div className="flex items-center gap-2 text-sm font-medium">
        <button
          onClick={() => onRangeOffsetChange(1)}
          aria-label="Previous range"
          className="hover:text-gray-800 cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="underline select-none text-[18px] font-medium">
          {rangeLabel}
        </span>
        <button
          onClick={() => onRangeOffsetChange(-1)}
          disabled={!canGoNext}
          aria-label="Next range"
          className={`hover:text-gray-800 ${
            !canGoNext ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Unit toggle */}
      <div className="flex bg-gray-100 rounded-full p-1 text-sm font-medium select-none">
        <button
          onClick={() => onUnitChange("week")}
          className={`px-4 py-1 rounded-full cursor-pointer ${
            unit === "week" ? "bg-white shadow" : "text-gray-500"
          }`}
        >
          7 хоногоор
        </button>
        <button
          onClick={() => onUnitChange("month")}
          className={`px-4 py-1 rounded-full cursor-pointer ${
            unit === "month" ? "bg-white shadow" : "text-gray-500"
          }`}
        >
          Сараар
        </button>
      </div>
    </div>
  );
};

export default AnalyticsControls;
