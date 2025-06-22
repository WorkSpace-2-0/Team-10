import React from "react";

const Progress = ({ values }: { values: any }) => {
  return (
    <div className="mb-6">
      <div className="w-full h-1.5 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${(values.step / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
