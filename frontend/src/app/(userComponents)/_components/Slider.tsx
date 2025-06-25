"use client";

import * as Slider from "@radix-ui/react-slider";
import React from "react";

type MoodSliderProps = {
  value: number;
  onChange: (val: number) => void;
  onMoodTitleChange?: (label: string) => void;
};

const moods = [
  { emoji: "😭", label: "Хэцүү", range: [0, 1.5] },
  { emoji: "😞", label: "Тавгүй", range: [1.5, 3] },
  { emoji: "🙂", label: "Хэвийн", range: [3, 4.5] },
  { emoji: "😊", label: "Дажгүй шүү", range: [4.5, 5.5] },
  { emoji: "😄", label: "Супер", range: [5.5, 6.01] },
];

const getMood = (value: number) => {
  return (
    moods.find((m) => value >= m.range[0] && value < m.range[1]) || moods[0]
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
        <div className="text-6xl">{currentMood.emoji}</div>
        <div className="text-gray-700 text-lg font-medium">
          {currentMood.label}
        </div>
      </div>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-7"
        min={0}
        max={6}
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
