"use client";

import React, { useState } from "react";

type AnalyticsControlsProps = {
  onRangeChange: (range: number) => void;
  onUnitChange: (unit: "day" | "week" | "month") => void;
  range: number;
  unit: "day" | "week" | "month";
};

const AnalyticsControls: React.FC<AnalyticsControlsProps> = ({
  onRangeChange,
  onUnitChange,
  range,
  unit,
}) => {
  const rangeOptions = [7, 30, 60, 90, 120];

  return (
    <div className="flex gap-4 mb-6">
      <div className="flex items-center space-x-2">
        <select
          value={range}
          onChange={(e) => onRangeChange(parseInt(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {rangeOptions.map((d) => (
            <option key={d} value={d}>
              Сүүлийн {d} өдрөөр
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <select
          value={unit}
          onChange={(e) =>
            onUnitChange(e.target.value as "day" | "week" | "month")
          }
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="day">Өдрөөр</option>
          <option value="week">7 хоногоор</option>
          <option value="month">Сараар</option>
        </select>
      </div>
    </div>
  );
};

export default AnalyticsControls;
