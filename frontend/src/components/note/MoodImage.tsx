import React from "react";

const MOOD_IMAGES: Record<string, string> = {
  Хэцүү: "/images/angryv2.svg",
  "Дажгүй шүү": "/images/happyv2.svg",
  Тавгүй: "/images/sadv2.svg",
  Хэвийн: "/images/neutral.svg",
  Супер: "/images/superv2.svg",
};

const MoodComponent = ({ mood }: { mood: any }) => {
  if (!mood) return null;
  const imgSrc = MOOD_IMAGES[mood.moodTitle];
  return imgSrc ? <img src={imgSrc} alt={mood.moodTitle}  className="w-[70px] h-[70px] overflow-hidden" /> : null;
};

export default MoodComponent;
