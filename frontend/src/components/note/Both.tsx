"use client";

import * as React from "react";
import { Calendar } from "../ui/calendar";
import { Trash } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import MoodComponent from "./MoodImage";
import { mn } from "date-fns/locale";
import { formatWithOptions } from "date-fns/fp";
import { format } from "date-fns";

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

  // Build a map: date string (yyyy-MM-dd) -> mood object (latest for that day)
  const moodMap = React.useMemo(() => {
    const map = new Map<string, any>();
    moods.forEach((mood) => {
      const dateObj = mood.createdAt instanceof Date ? mood.createdAt : new Date(mood.createdAt);
      if (!isNaN(dateObj.getTime())) {
        const key = format(dateObj, "yyyy-MM-dd");
        // If multiple moods per day, keep the latest (or change logic as needed)
        if (!map.has(key) || dateObj > map.get(key).createdAt) {
          map.set(key, { ...mood, createdAt: dateObj });
        }
      }
    });
    return map;
  }, [moods]);

  // Build modifiers and modifiersClassNames for calendar
  const modifiers: Record<string, Date[]> = {};
  const modifiersClassNames: Record<string, string> = {};

  // Color underline for each mood day
  moodMap.forEach((mood, dateStr) => {
    const className = moodColorMap[mood.moodTitle] || "mood-neutral";
    if (!modifiers[className]) modifiers[className] = [];
    modifiers[className].push(new Date(dateStr));
    modifiersClassNames[className] = className;
  });

  // Pencil modifier for any day with a mood note
  const pencilDates = Array.from(moodMap.values())
    .filter((mood) => mood.note && mood.note.trim() !== "")
    .map((mood) => new Date(format(mood.createdAt, "yyyy-MM-dd")));
  if (pencilDates.length > 0) {
    modifiers["pencil"] = pencilDates;
    modifiersClassNames["pencil"] = "pencil";
  }

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
    return format(date, "yyyy.MM.dd");
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
          <div className="w-full h-auto flex flex-col px-[32px] py-[22px] gap-1.5 bg-white border border-[#E5E5E5] rounded-[20px] mb-4">
            {/* Header */}
            <div className="w-full flex items-center justify-between gap-[12px]">
              <div className="flex gap-[12px] items-center">
                <div className="w-[70px] h-[70px] overflow-hidden">
                  <img src="/images/none.svg" alt="none" />
                </div>
                <h2 className="text-neutral-400 text-base font-medium leading-tight">
                  Мэдээлэл алга
                </h2>
              </div>
              {/* Show selected date here */}
              <div className="shrink-0 text-left">
                <pre className="whitespace-pre-line text-neutral-400 text-sm font-base leading-tight">
                  {dates ? formatMoodDate(dates) : ""}
                </pre>
              </div>
            </div>
            {/* Note Content */}
            <div className="w-full">
              <h2 className="text-neutral-400 text-base font-normal leading-snug">
                Та энэ өдөр тэмдэглэл хөтлөөгүй байна.
              </h2>
            </div>
            {/* Delete Button */}
            <div className="flex justify-end">
              <button className="cursor-pointer">
                <Trash className="w-[16px] h-[16px] border-neutral-400" />
              </button>
            </div>
          </div>
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