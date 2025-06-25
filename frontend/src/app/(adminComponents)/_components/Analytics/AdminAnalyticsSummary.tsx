"use client";

import React from "react";
import SmileEmoji from "../../../../components/ui/emojis/SmileEmoji";

interface AnalyticsSummaryProps {
  summary: {
    bestDay?: string;
    changePercentage?: number;
    overallAverage?: number;
    participantCount?: number;
    totalUsers?: number;
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

const AdminAnalyticsSummary: React.FC<AnalyticsSummaryProps> = ({
  summary,
  range,
}) => {
  const participantCount = summary?.participantCount ?? 0;
  const totalUsers = summary?.totalUsers ?? 1;
  const participantPercentage = ((participantCount / totalUsers) * 100).toFixed(
    2
  );
  const participantFraction = `${participantCount}/${totalUsers}`;

  const stats = [
    {
      title: "Багийн сэтгэл санааны ерөнхий байдал",
      value: summary?.overallAverage ?? "N/A",
      decription: `Сүүлийн ${range} хоногийн багийн сэтгэл санааны дундаж үнэлгээ`,
    },
    {
      title: "Өөрчлөлт",
      value: summary.changePercentage ?? "N/A",
      decription: `Багийн өмнөх ${range} хоногтой хайрцуулахад `,
    },
    {
      title: "Багийн оролцоо",
      value: `${participantPercentage}%`,
      decription: `${participantFraction} гишүүд`,
    },
  ];

  return (
    <div>
      <h1 className="text-[26px]">Багийн сэтгэл санааны байдал</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="space-y-4 flex justify-between">
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

export default AdminAnalyticsSummary;
