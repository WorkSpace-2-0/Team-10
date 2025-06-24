"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);
const unitTranslations = {
  day: "Өдрөөр",
  week: "7 хоногоор",
  month: "Сараар",
};

type MoodChartProps = {
  data: any[];
  unit: "day" | "week" | "month";
  rangeDays: number;
};

const MoodChart: React.FC<MoodChartProps> = ({ data, unit, rangeDays }) => {
  const mongolianUnit = unitTranslations[unit] || unit;

  const chartData = {
    labels: data?.map((d) => d.label) || [],
    datasets: [
      {
        label: "Average Mood",
        data: data?.map((d) => d.averageMood) || [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: `${mongolianUnit}, сүүлийн ${rangeDays} хоногийн грфик`,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Mood: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        type: "time" as const,
        time: {
          unit: unit as "day" | "week" | "month",
          tooltipFormat: unit === "week" ? "YYYY-[W]WW" : "YYYY-MM-DD",
          displayFormats: {
            day: "MMM D",
            week: "YYYY-[W]WW",
            month: "MMM YYYY",
          },
        },
        distribution: "series" as const,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 15,
        },
      },
      y: {
        min: 0,
        max: 10,
      },
    },
  };

  return (
    <div className="w-full h-[400px] bg-white rounded-lg shadow-md p-4">
      <Line
        data={chartData}
        options={options}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default MoodChart;
