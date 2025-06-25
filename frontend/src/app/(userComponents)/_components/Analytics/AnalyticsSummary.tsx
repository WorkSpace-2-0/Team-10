"use client";

import React from "react";
import SmileEmoji from "@/components/ui/emojis/SmileEmoji";

interface AnalyticsSummaryProps {
  summary: {
    bestDay?: string;
    streakCount?: number;
    overallAverage?: number;
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

const AnalyticsSummary: React.FC<AnalyticsSummaryProps> = ({
  summary,
  range,
}) => {
  const isWeekDay = (day: string): day is keyof typeof WeekDayTranslation =>
    day in WeekDayTranslation;
  const stats = [
    {
      title: "Таний хамгийн өөдрөг өдөр",
      value:
        summary?.bestDay && isWeekDay(summary.bestDay)
          ? WeekDayTranslation[summary.bestDay]
          : "N/A",
      decription: `Сүүлийн ${range} хоногт таны хамгийн өөдрөг байсан өдөр`,
    },
    {
      title: "Таны тууштай аялал",
      value:
        summary?.streakCount && summary.streakCount > 0
          ? `${summary.streakCount} өдөр`
          : "Одоогоор эхлээгүй байна",
      decription:
        summary?.streakCount && summary.streakCount > 0
          ? `Та сүүлийн ${summary.streakCount} өдөр дараалан өөрийн сэтгэл санаандаа анхаарал хандуулсан байна`
          : "Та одоогоор сэтгэл санаагаа бүртгэж эхлээгүй байна.",
    },
    {
      title: "Таны сэтгэл санааны ерөнхий байдал",
      value: summary?.overallAverage ?? "N/A",
      decription: `Сүүлийн ${range} хоногт таны сэтгэл санааны дундаж үнэлгээ 6.2 байсан байна`,
    },
  ];

  return (
    <div>
      <h1 className="text-[26px]">Таны сэтгэл санааны байдал</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="space-y-4 flex ">
              <div className="flex flex-col items-start gap-2">
                <p className="text-sm text-neutral-500 text-[16px]">
                  {stat.title}
                </p>
                <p className="text-xl font-bold text-[#4B85F7] text-[26px]">
                  {stat.value}
                </p>
                <p className="text-[16px]">{stat.decription}</p>
              </div>
              <div className="flex  items-center">
                <SmileEmoji />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsSummary;
