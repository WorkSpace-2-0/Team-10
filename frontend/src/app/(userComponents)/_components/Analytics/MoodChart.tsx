"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const mongolianDaysMap: Record<string, string> = {
  Monday: "Даваа",
  Tuesday: "Мягмар",
  Wednesday: "Лхагва",
  Thursday: "Пүрэв",
  Friday: "Баасан",
  Saturday: "Бямба",
  Sunday: "Ням",
};

type MoodEntry = {
  label: string;
  averageMood: number;
  count: number;
};

type MoodChartProps = {
  data: {
    current: MoodEntry[];
    previous: MoodEntry[];
  };
  unit: "week" | "month";
  rangeDays: number;
  rangeLabel: string;
  changePercentage?: number; // Get this from backend instead of calculating
};

const MoodChart: React.FC<MoodChartProps> = ({
  data,
  unit,
  rangeDays,
  rangeLabel,
  changePercentage = 0,
}) => {
  if (!data || !data.current || data.current.length === 0) {
    return (
      <Card className="w-full bg-white rounded-xl shadow-md p-4">
        <CardContent className="py-8">
          <div className="text-center">
            <p className="text-gray-500 mb-2">Өгөгдөл олдсонгүй</p>
            <p className="text-sm text-gray-400">
              {unit === "week" ? "Энэ долоо хоногт" : "Энэ сард"} сэтгэл санааны
              өгөгдөл бүртгэгдээгүй байна
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.current.map((d) => {
    let displayLabel = d.label;
    let tooltipLabel = d.label;

    if (unit === "week") {
      displayLabel = mongolianDaysMap[d.label] || d.label;
      tooltipLabel = displayLabel;
    } else if (unit === "month") {
      displayLabel = `${d.label} өдөр`;
      tooltipLabel = `${d.label} өдрүүд`;
    }

    return {
      ...d,
      displayLabel,
      tooltipLabel,
    };
  });

  // Calculate average mood for the period
  const validMoods = chartData.filter((item) => item.averageMood > 0);
  const totalMoodSum = validMoods.reduce(
    (sum, item) => sum + item.averageMood,
    0
  );
  const avgMood = validMoods.length
    ? +(totalMoodSum / validMoods.length).toFixed(1)
    : 0;

  // Calculate total entries
  const totalEntries = chartData.reduce((sum, item) => sum + item.count, 0);

  // Use backend-provided change percentage
  const getTrendDisplay = () => {
    if (Math.abs(changePercentage) < 0.1) return null;

    return {
      direction: changePercentage > 0 ? "up" : "down",
      percent: Math.abs(changePercentage).toFixed(1),
      color: changePercentage > 0 ? "text-green-600" : "text-red-600",
      icon: changePercentage > 0 ? "↗" : "↘",
    };
  };

  const trend = getTrendDisplay();

  return (
    <Card className="w-full bg-white rounded-xl shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <div className="flex items-baseline">
                <p className="text-[32px] font-semibold">{avgMood}</p>
                <p className="text-[20px] font-semibold text-neutral-400">
                  /10
                </p>
              </div>
              {trend && (
                <span className={`text-sm font-medium ${trend.color}`}>
                  {trend.icon} {trend.percent}%
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">{totalEntries} бүртгэл</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              {unit === "week" ? "7 ХОНОГИЙН" : "САРЫН"} ДУНДАЖ
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-[320px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="displayLabel"
              tickLine={false}
              axisLine={{ stroke: "#cbd5e0" }}
              tick={{ fontSize: 12, fill: "#4a5568" }}
              interval={0}
              angle={unit === "month" ? -45 : 0}
              textAnchor={unit === "month" ? "end" : "middle"}
              height={unit === "month" ? 80 : 60}
            />
            <YAxis
              domain={[0, 10]}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e0" }}
              tick={{ fontSize: 12, fill: "#4a5568" }}
              tickCount={6}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || !payload.length) return null;

                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-medium text-gray-900">
                      {data.tooltipLabel}
                    </p>
                    <p className="text-blue-600 font-bold">
                      {data.averageMood} оноо
                    </p>
                    <p className="text-sm text-gray-500">
                      {data.count} бүртгэл
                    </p>
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              dataKey="averageMood"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                r: 5,
                stroke: "#3b82f6",
                strokeWidth: 2,
                fill: "#fff",
              }}
              activeDot={{
                r: 7,
                stroke: "#3b82f6",
                strokeWidth: 3,
                fill: "#3b82f6",
              }}
              connectNulls={false}
              isAnimationActive={true}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MoodChart;
