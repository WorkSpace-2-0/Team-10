import Image from "next/image";
import React from "react";

const Progress = ({ values }: { values: { step: number } }) => {
  const totalStars = 6;

  return (
    <div className="relative w-full max-w-8xl mx-auto px-4 mb-6">
      <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 rounded-full -translate-y-1/2 z-0" />

      <div
        className="absolute top-1/2 left-0 h-2 bg-blue-500 rounded-full -translate-y-1/2 z-10 transition-all duration-300"
        style={{
          width: `${((values.step - 1) / (totalStars - 1)) * 100}%`,
        }}
      />

      <div className="relative z-20 flex justify-between items-center">
        {[...Array(totalStars)].map((_, index) => {
          const filled = index < values.step;

          return (
            <div
              key={index}
              className="w-10 h-10 flex items-center justify-center"
            >
              <Image
                src={
                  filled
                    ? "/images/progressTrack.png"
                    : "/images/progressunTrack.png"
                }
                alt="Progress Icon"
                width={40}
                height={40}
                className="object-contain w-full h-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;
