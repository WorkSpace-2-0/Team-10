"use client";

import React from "react";
import { motion } from "framer-motion";
import GreenMood from "src/components/svg/GreenMood";
import SmileEmoji from "src/components/svg/SmileEmoji";
import SadEmoji from "src/components/svg/SadEmoji";
import SadBlue from "src/components/svg/SadBlue";

interface AnalyticsSummaryProps {
  summary: {
    bestDay?: string;
    overallAverage?: number;
    participantCount?: number;
    streakCount?: number;
    lowestDay?: string;
    topMoodTitle?: string;
  };
  range: number;
}

const WeekDayTranslation = {
  Monday: "Даваа",
  Tuesday: "Мягмар",
  Wednesday: "Лхагва",
  Thursday: "Пүрэв",
  Friday: "Баасан",
  Saturday: "Бямба",
  Sunday: "Ням",
} as const;

const moodColors: Record<string, string> = {
  Супер: "#F7DE5F",
  "Дажгүй шүү": "#A0DF9A",
  Тавгүй: "#3294F5",
  Хэцүү: "#F38484",
  Хэвийн: "#AAB1C3",
};
const moods = [
  { image: "angryv2.svg", label: "Хэцүү", min: 0, max: 2 },
  { image: "sadv2.svg", label: "Тавгүй", min: 2, max: 4 },
  { image: "neutral.svg", label: "Хэвийн", min: 4, max: 6 },
  { image: "happyv2.svg", label: "Дажгүй шүү", min: 6, max: 8 },
  { image: "superv2.svg", label: "Супер", min: 8, max: 10.01 },
];
const findMoodImage = (label?: string) => {
  if (!label) return null;
  const mood = moods.find((m) => m.label === label);
  return mood ? mood.image : null;
};

const AnalyticsSummary: React.FC<AnalyticsSummaryProps> = ({
  summary,
  range,
}) => {
  const isWeekDay = (day: string): day is keyof typeof WeekDayTranslation =>
    day in WeekDayTranslation;

  if (!summary) {
    return (
      <div className="p-4 text-center text-gray-500">Мэдээлэл олдсонгүй</div>
    );
  }

  const topMoodColor = summary.topMoodTitle
    ? moodColors[summary.topMoodTitle] || "#000"
    : "#000";
  const topMoodImage = findMoodImage(summary.topMoodTitle);

  const getLabel = () => (range === 7 ? "Сүүлийн долоо хоног" : "Сүүлийн сар");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[26px] font-semibold mb-6">
          Таны сэтгэл санааны байдал
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Best Day */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-[16px] text-neutral-500">Өөдрөг өдөр</p>
              <p className="text-[26px] font-medium text-[#4B85F7]">
                {summary.bestDay && isWeekDay(summary.bestDay)
                  ? WeekDayTranslation[summary.bestDay]
                  : "Тодорхойгүй"}
              </p>
              <p className="text-[16px]">{getLabel()}</p>
            </div>
            <div className="ml-4">
              <SmileEmoji />
            </div>
          </div>

          {/* Lowest Day */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-[16px] text-neutral-500">
                Сэтгэл жаахан унасан өдөр
              </p>
              <p className="text-[26px] font-medium text-[#4B85F7]">
                {summary.lowestDay && isWeekDay(summary.lowestDay)
                  ? WeekDayTranslation[summary.lowestDay]
                  : "Тодорхойгүй"}
              </p>
              <p className="text-[16px] text-gray-600">{getLabel()}</p>
            </div>
            <div className="ml-4">
              <SadBlue />
            </div>
          </div>

          {/* Top Mood Title */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-[16px] text-neutral-500">
                Давамгайлсан мэдрэмж
              </p>
              <p
                className="text-[26px] font-medium"
                style={{ color: topMoodColor }}
              >
                {summary.topMoodTitle || "Тодорхойгүй"}
              </p>
              <p className="text-[16px] text-gray-600">{getLabel()}</p>
            </div>
            <img
              src={`/images/${topMoodImage}`}
              alt={summary.topMoodTitle}
              className="w-10 h-10 "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummary;
