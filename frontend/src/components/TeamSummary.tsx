// components/TeamSummary.tsx

import React from "react";

type MoodDataPoint = {
  date: string; // e.g., "2025-06-28"
  value: number; // mood score
};

type Stat = {
  label: string;
  value: number;
  previousValue: number;
};

type SummaryData = {
  stats: Stat[];
  teamMood: MoodDataPoint[]; // time series data
};

type Props = {
  summary: SummaryData;
};

const getChange = (value: number, previousValue: number) => {
  const diff = value - previousValue;
  const isPositive = diff >= 0;
  return {
    value: Math.abs(diff),
    isPositive,
  };
};

export const hasMoodDroppedThreeDays = (moodData: MoodDataPoint[]) => {
  if (!moodData || moodData.length < 4) return false;

  let streak = 0;

  for (let i = 1; i < moodData.length; i++) {
    if (moodData[i].value < moodData[i - 1].value) {
      streak++;
      if (streak >= 3) return true;
    } else {
      streak = 0;
    }
  }

  return false;
};

const TeamSummary: React.FC<Props> = ({ summary }) => {
  const showMoodDropWarning = hasMoodDroppedThreeDays(summary.teamMood);

  return (
    <div className="space-y-4">
      {showMoodDropWarning && (
        <div className="bg-[#FEF3E7] text-[#EA820B] border border-[#FCD8B3] rounded-xl px-4 py-3 flex items-center">
          <span className="text-xl mr-2">⚠️</span>
          <p className="text-sm">
            Багийн сэтгэл зүй 3 хоног дараалан буурсан байна.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {summary?.stats?.map((stat, index) => {
          const change = getChange(stat.value, stat.previousValue);
          return (
            <div
              key={index}
              className="border rounded-xl p-4 bg-white space-y-2"
            >
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p
                className={`text-sm ${
                  change.isPositive ? "text-green-600" : "text-red-500"
                }`}
              >
                {change.isPositive ? "▲" : "▼"} {change.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamSummary;
