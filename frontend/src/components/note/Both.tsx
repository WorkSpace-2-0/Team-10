"use client";

import * as React from "react";
import { Calendar } from "../ui/calendar";
import { Trash } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import MoodComponent from "./MoodImage";
import { format } from "date-fns";
import { mn } from "date-fns/locale";
import { formatWithOptions } from "date-fns/fp";

const moodColorMap: Record<string, string> = {
  "Дажгүй шүү": "mood-happy",
  Тавгүй: "mood-sad",
  Хэцүү: "mood-angry",
  Супер: "mood-awesome",
  Хэвийн: "mood-neutral",
};

const BothSections = () => {
  const [dates, setDates] = React.useState<Date | undefined>(new Date());
  const [moods, setMoods] = React.useState<any[]>([]);

  const getUserIdFromToken = () => {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.userId;
    } catch (e) {
      return null;
    }
  };

  const userId = getUserIdFromToken();

  React.useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await fetch(
          `http://localhost:9999/mood/moods/user/${userId}`
        );
        const data = await res.json();
        const moodsWithDate = data.map((mood: any) => ({
          ...mood,
          createdAt: new Date(mood.createdAt),
        }));
        setMoods(moodsWithDate);
      } catch (err) {
        console.error("Failed to fetch moods", err);
      }
    };
    if (userId) fetchMoods();
  }, [userId]);

  const handleDelete = async (moodId: string) => {
    try {
      const res = await fetch(`http://localhost:9999/mood/delete/${moodId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.error("Failed to delete mood");
        return;
      }
      setMoods((prevMoods) => prevMoods.filter((m) => m._id !== moodId));
    } catch (err) {
      console.error("Error deleting mood:", err);
    }
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  // Build moodDateMap for colored calendar underlines
  const moodDateMap = React.useMemo(() => {
    const map: { date: Date; moodTitle: string }[] = [];
    const seen = new Set<string>();
    moods.forEach((mood) => {
      const dateObj =
        mood.createdAt instanceof Date
          ? mood.createdAt
          : new Date(mood.createdAt);
      if (!isNaN(dateObj.getTime())) {
        const key = dateObj.toISOString().slice(0, 10) + mood.moodTitle;
        if (!seen.has(key)) {
          seen.add(key);
          map.push({
            date: new Date(dateObj.toISOString().slice(0, 10)),
            moodTitle: mood.moodTitle,
          });
        }
      }
    });
    return map;
  }, [moods]);

  // Build modifiers and modifiersClassNames for calendar
  const modifiers: Record<string, Date[]> = {};
  const modifiersClassNames: Record<string, string> = {};
  moodDateMap.forEach(({ date, moodTitle }) => {
    const className = moodColorMap[moodTitle] || "mood-neutral";
    if (!modifiers[className]) modifiers[className] = [];
    modifiers[className].push(date);
    modifiersClassNames[className] = className;
  });

  const filteredMoods = React.useMemo(() => {
    if (!dates) return moods;
    return moods.filter(
      (mood) =>
        mood.createdAt instanceof Date &&
        !isNaN(mood.createdAt.getTime()) &&
        isSameDay(new Date(mood.createdAt), dates)
    );
  }, [dates, moods]);

  const formatMoodDate = (date: Date) => {
    const formatMN = formatWithOptions({ locale: mn });
    const weekday = formatMN("EEEE", date); // Даваа гараг
    const month = formatMN("M", date); // 6
    const day = formatMN("d", date); // 16
    const year = formatMN("yyyy", date); // 2025
    const time = formatMN("HH:mm", date); // 12:48
    return `${weekday}\n${month} сарын ${day}, ${year}\n${time}`;
  };

  // Fix double click by toggling selected date
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    if (dates && date.getTime() === dates.getTime()) {
      setDates(undefined);
    } else {
      setDates(date);
    }
  };

  return (
    <div className="flex inline-flex gap-[1.5rem] overflow-hidden">
      {/* 📅 Calendar */}
      <div>
        <Calendar
          mode="single"
          selected={dates}
          onSelect={handleDateSelect}
          className="w-[488px] h-[483px] rounded-md border shadow-sm"
          captionLayout="dropdown"
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
        />
      </div>

      {/* 📝 Mood Entries */}
      <div className="w-[700px] h-auto">
        {filteredMoods.length === 0 ? (
          <div className="text-neutral-500">No moods on this day.</div>
        ) : (
          filteredMoods.map((mood, idx) => (
            <div
              key={mood._id || idx}
              className="w-full h-auto flex flex-col px-[32px] py-[22px] gap-1.5 bg-white border border-[#E5E5E5] rounded-[20px] mb-4"
            >
              {/* Header */}
              <div className="w-full flex items-center justify-between gap-[12px]">
                <div className="flex gap-[12px] items-center">
                  <div className="w-[70px] h-[70px] overflow-hidden">
                    <MoodComponent mood={mood} />
                  </div>
                  <h2 className="text-neutral-800 text-base font-medium leading-tight">
                    {mood.moodTitle || "No description"}
                  </h2>
                </div>
                {/* Formatted Date */}
                <div className="shrink-0 text-left">
                  <pre className="whitespace-pre-line text-neutral-400 text-sm font-base leading-tight">
                    {formatMoodDate(mood.createdAt)}
                  </pre>
                </div>
              </div>
              {/* Note Content */}
              <div className="w-full">
                <h2 className="text-neutral-800 text-base font-normal leading-snug">
                  {mood.note || "No note"}
                </h2>
              </div>
              {/* Delete Button */}
              <div className="flex justify-end">
                <button
                  className="cursor-pointer"
                  onClick={() => handleDelete(mood._id)}
                >
                  <Trash className="w-[16px] h-[16px]" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BothSections;
