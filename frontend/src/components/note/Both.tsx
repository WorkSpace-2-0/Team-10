"use client";

import * as React from "react";
import { Calendar } from "../ui/calendar";
import { Trash } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { format } from "date-fns";
import MoodComponent from "./MoodImage";

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
          `${process.env.NEXT_PUBLIC_BASE_URL}/mood/moods/user/${userId}`
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/mood/delete/${moodId}`,
        {
          method: "DELETE",
        }
      );

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

  const noteDates = React.useMemo(() => {
    const dateMap = new Map<string, Date>();
    moods.forEach((mood) => {
      if (mood.createdAt instanceof Date && !isNaN(mood.createdAt.getTime())) {
        const date = new Date(mood.createdAt);
        const key = date.toDateString();
        if (!dateMap.has(key)) {
          dateMap.set(
            key,
            new Date(date.getFullYear(), date.getMonth(), date.getDate())
          );
        }
      }
    });
    return Array.from(dateMap.values());
  }, [moods]);

  const filteredMoods = React.useMemo(() => {
    if (!dates) return moods;
    return moods.filter(
      (mood) =>
        mood.createdAt instanceof Date &&
        !isNaN(mood.createdAt.getTime()) &&
        isSameDay(new Date(mood.createdAt), dates)
    );
  }, [dates, moods]);

  // Date formatting function
  const formatMoodDate = (date: Date) => {
    return `${format(date, "EEEE")},\n${format(
      date,
      "MMMM do, yyyy"
    )}\n${format(date, "HH:mm")}`;
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
          modifiers={{ hasMood: noteDates }}
          modifiersClassNames={{ hasMood: "has-mood" }}
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
                  <div className="w-[70px] h-[60px] overflow-hidden">
                    <MoodComponent key={mood._id} />
                  </div>
                  <h2 className="text-neutral-800 text-base font-medium leading-tight">
                    {mood.moodTitle || "No description"}
                  </h2>
                </div>

                {/* Formatted Date */}
                <div className="shrink-0 text-right">
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
                  <Trash />
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
