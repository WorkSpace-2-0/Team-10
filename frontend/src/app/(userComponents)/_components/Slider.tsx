"use client";

import * as Slider from "@radix-ui/react-slider";
import React from "react";

type MoodSliderProps = {
  value: number;
  onChange: (val: number) => void;
  onMoodTitleChange?: (label: string) => void;
};

const moods = [
  { image: "angryv2.svg", label: "Хэцүү", min: 0, max: 2 },
  { image: "sadv2.svg", label: "Тавгүй", min: 2, max: 4 },
  { image: "neutralv2.svg", label: "Хэвийн", min: 4, max: 6 },
  { image: "happyv2.svg", label: "Дажгүй шүү", min: 6, max: 8 },
  { image: "superv2.svg", label: "Супер", min: 8, max: 10.01 }, 
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
          className="w-20 h-20 object-contain overflow-hidden"
        />
        <div className="w-[487px] h-[23px] font-inter font-medium text-[16px] leading-[130%] text-center text-neutral-800 mb-1">
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
        <Slider.Track className="relative grow rounded-full h-3 overflow-hidden">
          <img
            src="/images/slider.svg"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <Slider.Range className="absolute h-full rounded-full bg-white/30" />
        </Slider.Track>

        <Slider.Thumb className="block w-9 h-9 rounded-full overflow-hidden p-0 focus:outline-none focus:ring-0">
          <img src="/images/ring.png" className="w-full h-full object-cover" />
        </Slider.Thumb>
      </Slider.Root>
    </div>
  );
}
