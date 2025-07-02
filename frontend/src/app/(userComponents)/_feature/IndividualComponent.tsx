"use client";

import React, { useEffect, useState } from "react";
import UserAnalytics from "../_components/Analytics/UserAnalytics";
import MoodEntry from "../_components/MoodEntry";
import { useUser } from "../../../contexts/UserContext";
import { useStreak } from "src/contexts/StreakContext";
UserAnalytics;

const weekdays = ["Да", "Мя", "Лха", "Пү", "Ба"];

const moodToEmoji: Record<string, string> = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  excited: "😁",
  tired: "😴",
  neutral: "😐",
};

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [moods, setMoods] = useState<any[]>([]);
  const { name, userId } = useUser();
  const { streakCount, loading } = useStreak();

  useEffect(() => {
    const fetchMoods = async () => {
      const res = await fetch(`/mood/moods/user/${userId}`);
      const data = await res.json();
      setMoods(data);
    };
    fetchMoods();
  }, [userId]);

  const handleSuccess = () => {
    setSubmitted(true);
    fetch(`/mood/moods/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setMoods(data));
  };

  const getDayEmojiMap = () => {
    const map = new Map<string, string>();

    for (let i = 1; i <= 5; i++) {
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      const diff = i - currentDay;
      const targetDate = new Date(currentDate);
      targetDate.setDate(currentDate.getDate() + diff);

      const targetDateStr = targetDate.toISOString().slice(0, 10);

      const moodForDay = moods.find((m: any) => {
        const moodDate = new Date(m.createdAt).toISOString().slice(0, 10);
        return moodDate === targetDateStr;
      });

      const weekDay = weekdays[i - 1];
      const emoji = moodForDay
        ? moodForDay.emoji || moodToEmoji[moodForDay.mood] || ""
        : "";

      if (emoji) {
        map.set(weekDay, emoji);
      }
    }

    return weekdays.map((day) => ({
      day,
      emoji: map.get(day) || "",
      filled: map.has(day),
    }));
  };

  const days = getDayEmojiMap();
  console.log(streakCount);

  return (
    <div className="h-full w-full flex items-center flex-col gap-6 justify-center bg-[#f7f7f7] ">
      {!submitted ? (
        <MoodEntry onSuccess={handleSuccess} name={name} />
      ) : (
        <div className="flex flex-col items-center bg-white pt-[44px] rounded-b-[100px] text-center w-full h-auto">
          <h2 className="text-xl font-semibold mb-2">Сайн уу, {name}</h2>
          <h1 className="text-2xl font-bold mb-2">
            Мэдрэмжээ хуваалцсанд баярлалаа.
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Таны тэмдэглэл зөвхөн танд л харагдах болно.
            <br />
            Багийн менежерт багийн нийт оноо л харагдана.
          </p>

          <div className="text-yellow-500 text-[80px] font-bold my-4">
            {loading ? (
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            ) : (
              streakCount
            )}
          </div>
          <div className="text-xl font-semibold mb-6">хоногийн streak</div>

          <div className="bg-gray-50 border rounded-xl p-6 mb-[94px] max-w-md w-full shadow-sm">
            <div className="flex justify-between items-center mb-4">
              {days.map((d, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {d.day}
                  </span>
                  <div className="mt-2 text-2xl">
                    {d.filled ? (
                      d.emoji
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-200" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Өдөр бүр мэдрэмжээ хуваалцсанаар таны streak нэмэгдэж болно. Харин
              өдөр алгасвал streak-ийг дахин шинээр эхлүүлнэ.
            </p>
          </div>
        </div>
      )}
      <UserAnalytics />
    </div>
  );
}
