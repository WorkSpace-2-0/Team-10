"use client";

import React from "react";
import SadEmoji from "src/components/svg/SadEmoji";
import SmileEmoji from "src/components/svg/SmileEmoji";
import TeamEmoji from "src/components/svg/TeamEmoji";
import TrendDownSvg from "src/components/svg/TrendDownSvg";

interface AnalyticsSummaryProps {
  summary: {
    bestDay?: string;
    changePercentage?: number;
    overallAverage?: number;
    participantCount?: number;
    totalUsers?: number;
    rangeDays?: number;
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
    1
  );
  const overallAverage = summary?.overallAverage ?? 0;
  const changePercentage = summary?.changePercentage ?? 0;
  const bestDay = summary?.bestDay;

  // Helper function to get mood description
  const getMoodDescription = (score: number): string => {
    if (score >= 8) return "Маш сайн";
    if (score >= 6) return "Сайн";
    if (score >= 4) return "Дундаж";
    if (score >= 2) return "Муу";
    return "Маш муу";
  };

  const getTrendIndicator = (change: number) => {
    if (Math.abs(change) < 0.5) {
      return { icon: "→", color: "text-[#4B85F7]", text: "Тогтвортой" };
    }
    if (change > 0) {
      return { icon: "+", color: "text-[#57C74D]", text: "Сайжирсан" };
    }
    return { icon: <TrendDownSvg />, color: "text-[#EA820B]", text: "Муудсан" };
  };

  const trend = getTrendIndicator(changePercentage);

  const stats = [
    {
      title: "Багийн сэтгэл санааны байдал",
      value: `${overallAverage.toFixed(1)}/10`,
      subtitle: getMoodDescription(overallAverage),
      description: `${
        range === 7
          ? "Сүүлийн долоо хоногийн дундаж үнэлгээ"
          : "Сүүлийн сарын хоногийн дундаж үнэлгээ"
      }`,
      icon: overallAverage < 5 ? <SadEmoji /> : <SmileEmoji />,
      color: overallAverage < 5 ? "text-[#EA820B]" : "text-[#4B85F7]",
    },
    {
      title: "Өөрчлөлт",
      value: `${
        changePercentage > 0 ? "+" : changePercentage < 0 ? "-" : ""
      }${Math.abs(changePercentage).toFixed(1)}%`,
      subtitle: trend.text,
      description: `${
        range === 7
          ? "Өмнөх долоо хоногтой харьцуулахад"
          : "Өмнөх сартай харьцуулахад"
      }`,
      icon: trend.icon,
      color: trend.color,
    },
    {
      title: "Оролцоо",
      value: `${participantPercentage}%`,
      subtitle: `${participantCount}/${totalUsers} гишүүд`,
      description: `${participantCount}/${totalUsers} гишүүд`,
      icon: <TeamEmoji />,
      color: "text-[#4B85F7]",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-medium text-gray-900">
            Багийн сэтгэл санааны байдал
          </h1>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            {range === 7 ? "ДОЛОО ХОНОГИЙН ТАЙЛАН" : "САРЫН ТАЙЛАН"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl cursor-default shadow-md py-8 px-7 flex items-center justify-between hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start ">
              <div className="flex-1">
                <p className="text-[16px] ">{stat.title}</p>
                <div className="flex items-baseline  mb-1">
                  <p className={`text-[26px] font-medium ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>

                <p className="text-sm text-neutral-500">{stat.description}</p>
              </div>
            </div>
            <span className={`text-lg ${stat.color}`}>{stat.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnalyticsSummary;
