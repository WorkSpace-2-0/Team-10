"use client";

import * as Slider from "@radix-ui/react-slider";
import React from "react";

type MoodSliderProps = {
  value: number;
  onChange: (val: number) => void;
  onMoodTitleChange?: (label: string) => void;
};

const moods = [
  { image: "angry.png", label: "Хэцүү", min: 0, max: 2 },
  { image: "sad.png", label: "Тавгүй", min: 2, max: 4 },
  { image: "neutral.png", label: "Хэвийн", min: 4, max: 6 },
  { image: "happy.png", label: "Дажгүй шүү", min: 6, max: 8 },
  { image: "awesome.png", label: "Супер", min: 8, max: 10.01 }, // Cover edge case for 10
];

const getMood = (value: number) => {
  const roundedValue = Math.round(value * 100) / 100;
  return (
    moods.find((m) => roundedValue >= m.min && roundedValue < m.max) || moods[0]
  );
};

export default function MoodSlider({
  value,
  onChange,
  onMoodTitleChange,
}: MoodSliderProps) {
  const currentMood = getMood(value);

  React.useEffect(() => {
    if (onMoodTitleChange) {
      onMoodTitleChange(currentMood.label);
    }
  }, [value, currentMood.label, onMoodTitleChange]);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="flex flex-col items-center">
        <img
          src={`/images/${currentMood.image}`}
          alt={currentMood.label}
          className="w-20 h-20 object-contain"
        />
        <div className="text-gray-700 text-lg font-medium">
          {currentMood.label}
        </div>
      </div>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-7"
        min={0}
        max={10}
        step={0.01}
        value={[value]}
        onValueChange={(val) => onChange(val[0])}
      >
        <Slider.Track className="bg-[linear-gradient(to_right,#f87171,#c084fc,#60a5fa,#ffffff,#86efac,#facc15,#fbbf24)] relative grow rounded-full h-3 shadow-inner">
          <Slider.Range className="absolute bg-transparent h-full rounded-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-6 h-6 rounded-full bg-blue-400 shadow-lg transition-transform duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </Slider.Root>
    </div>
  );
}
