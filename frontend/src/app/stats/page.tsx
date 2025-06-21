"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
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

type Unit = "day" | "week" | "month";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const MoodAnalytics: React.FC<{ userId?: string }> = ({ userId }) => {
  const [rangeDays, setRangeDays] = useState<number>(30);
  const [unit, setUnit] = useState<Unit>("day");
  const [chartData, setChartData] = useState<any>(null);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch chart and summary data whenever range or unit changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch mood chart
        const chartRes = await axios.get("http://localhost:9999/stats/chart", {
          params: { range: rangeDays, unit, userId },
        });

        // Filter out weekend labels just in case (only for 'day' unit)
        const filteredData = chartRes.data.data.filter((item: any) => {
          if (unit === "day") {
            const dayName = dayjs(item.label).format("dddd");
            return WEEKDAYS.includes(dayName);
          }
          return true;
        });

        setChartData(filteredData);

        // Fetch summary
        const summaryRes = await axios.get(
          "http://localhost:9999/stats/summary",
          {
            params: { range: rangeDays, userId },
          }
        );
        setSummary(summaryRes.data);
      } catch (err: any) {
        setError(err.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rangeDays, unit, userId]);

  // Prepare Chart.js data and options
  const data = {
    labels: chartData?.map((d: any) => d.label) || [],
    datasets: [
      {
        label: "Average Mood",
        data: chartData?.map((d: any) => d.averageMood) || [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text: `Mood Tracker (${unit}, last ${rangeDays} days)`,
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
          unit: unit as Unit,
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
        title: { display: true, text: "Mood Score (0-10)" },
      },
    },
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <div
        style={{ marginBottom: 20, display: "flex", gap: 20, flexWrap: "wrap" }}
      >
        <label>
          Range:{" "}
          <select
            value={rangeDays}
            onChange={(e) => setRangeDays(parseInt(e.target.value))}
          >
            {[7, 30, 60, 90, 120].map((d) => (
              <option key={d} value={d}>
                Last {d} days
              </option>
            ))}
          </select>
        </label>

        <label>
          Aggregate By:{" "}
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </label>
      </div>

      {loading && <p>Loading analytics...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginBottom: 30,
              flexWrap: "wrap",
              gap: 15,
            }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 15,
                flex: "1 1 150px",
                textAlign: "center",
              }}
            >
              <h3>Best Day</h3>
              <p>{summary?.bestDay || "N/A"}</p>
            </div>

            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 15,
                flex: "1 1 150px",
                textAlign: "center",
              }}
            >
              <h3>Participants</h3>
              <p>{summary?.participantCount ?? "N/A"}</p>
            </div>

            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 15,
                flex: "1 1 150px",
                textAlign: "center",
              }}
            >
              <h3>Average Mood</h3>
              <p>{summary?.overallAverage ?? "N/A"}</p>
            </div>

            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 15,
                flex: "1 1 150px",
                textAlign: "center",
              }}
            >
              <h3>Change %</h3>
              <p
                style={{
                  color:
                    summary?.changePercentage > 0
                      ? "green"
                      : summary?.changePercentage < 0
                      ? "red"
                      : "black",
                }}
              >
                {summary?.changePercentage ?? "N/A"}%
              </p>
            </div>
          </div>

          {/* Line Chart */}
          <Line data={data} options={options} />
        </>
      )}
    </div>
  );
};

export default MoodAnalytics;
