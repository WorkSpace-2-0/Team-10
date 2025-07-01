"use client";

import React from "react";
import SmileEmoji from "../../../../components/svg/SmileEmoji";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import GreenMood from "src/components/svg/GreenMood";

interface AnalyticsSummaryProps {
  summary: {
    bestDay?: string;
    overallAverage?: number;
    participantCount?: number;
    streakCount?: number;
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

  if (!summary) {
    return (
      <div className="p-4 text-center text-gray-500">Мэдээлэл олдсонгүй</div>
    );
  }

  const streak = summary.streakCount || 0;
  const maxStreak = 10;
  const isRewardUnlocked = streak >= maxStreak;

  const stats = [
    {
      title: "Таний хамгийн өөдрөг өдөр",
      value:
        summary.bestDay && isWeekDay(summary.bestDay)
          ? WeekDayTranslation[summary.bestDay]
          : "Тодорхойгүй",
      description: `${
        range === 7 ? "Сүүлийн долоо хоногоор" : "Сүүлийн сараар"
      }`,
      icon: <GreenMood className="w-8 h-8" />,
      color: "text-[#57C74D]",
    },
    {
      title: "Оролцсон өдрийн тоо",
      value: summary.participantCount ?? 0,

      description: `${
        range === 7
          ? `Та сүүлийн долоо хоногт нийт ${
              summary.participantCount ?? 0
            } удаа мэдрэмжээ хуваалцсан.`
          : `Та сүүлийн сард нийт ${
              summary.participantCount ?? 0
            } удаа мэдрэмжээ хуваалцсан.`
      }`,
      icon: <SmileEmoji />,
      color: "text-[#4B85F7]",
    },
    {
      title: isRewardUnlocked
        ? "🎉 Урамшуулал идэвхжсэн!"
        : "🔥 Урамшуулалд ойртож байна",
      value: isRewardUnlocked ? `10/10` : `${streak}/10`,
      description: isRewardUnlocked
        ? "Та 10 хоног дараалан оролцож урамшууллаа авлаа!"
        : `Та ${maxStreak - streak} өдөр дараалан оролцвол урамшууллаа авна.`,
      icon: (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isRewardUnlocked
              ? "bg-yellow-400 text-white animate-pulse"
              : "bg-gray-200 text-yellow-500"
          }`}
        >
          <Sparkles size={16} />
        </motion.div>
      ),
      color: "text-[#4B85F7]",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[26px] font-semibold mb-6">
          Таны сэтгэл санааны байдал
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between"
            >
              <div className="flex flex-col gap-2">
                <p className="text-[16px] text-neutral-500">{stat.title}</p>
                <p className={`text-[26px] font-medium ${stat.color} `}>
                  {stat.value}
                </p>
                <p className="text-[16px] text-gray-600">{stat.description}</p>

                {/* Progress bar if not yet unlocked */}
                {!isRewardUnlocked && index === 2 && (
                  <div className="w-full h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-yellow-400 to-pink-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(streak / maxStreak) * 100}%`,
                      }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                )}
              </div>
              <div className="ml-4">{stat.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummary;
