"use client";

import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import MoodSlider from "./Slider";
import { useUser } from "../../../contexts/UserContext";

type MoodEntryProps = {
  onSuccess?: () => void;
  name?: string;
};

export default function MoodForm({ onSuccess, name }: MoodEntryProps) {
  const [mood, setMood] = useState(2);
  const [moodTitle, setMoodTitle] = useState("Хэвийн"); // Default
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { userId } = useUser();

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/mood/newMood/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ moodScore: mood, note, moodTitle }),
        }
      );
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Алдаа гарлаа");
      }
      const data = await response.json();
      console.log(data);

      if (data.reward) {
        alert(`🎉 Та ${data.reward} урамшуулал авлаа!`);
      }

      setMessage("Амжилттай хадгалагдлаа!");
      setMood(2);
      setMoodTitle("Хэвийн");
      setNote("");

      if (onSuccess) onSuccess();
    } catch (error: any) {
      setMessage(error.message || "Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center text-center px-4 py-10">
      <div className="w-[590px] flex flex-col justify-center items-center">
        <h2 className="w-[487px] h-[23px] font-inter font-medium text-[18px] leading-[130%] text-center text-neutral-800 mb-1">
          Сайн уу, {name}
        </h2>

        <h1 className="w-[487px] h-[31px] text-[24px] text-[#262626] font-medium leading-[130%] text-center mb-8">
          Та өнөөдөр ямар сэтгэгдэлтэй байна вэ?
        </h1>

        <MoodSlider
          value={mood}
          onChange={setMood}
          onMoodTitleChange={setMoodTitle}
        />

        <div className="mt-6 mb-8 text-center">
          <img
            src="/images/text.png"
            className="inline-block w-[300px] h-auto object-contain"
          />
        </div>

        <p className="w-[250px] h-[20px] text-center font-medium text-[16px] leading-[20px] text-black mb-2">
          Тэмдэглэл үлдээх (заавал биш)
        </p>

        <Textarea
          placeholder="Би өнөөдөр..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-[386px] h-[90px] flex items-center justify-center px-3 py-2 box-border bg-[#FAFAFA] border border-[#E5E5E5] rounded-[10px] text-center text-base font-normal placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full flex justify-center disabled:cursor-not-allowed"
        >
          <img
            src={loading ? "/images/save.png" : "/images/save.png"}
            alt="Хадгалах"
            className={`h-10 transition-opacity ${
              loading ? "opacity-50" : "hover:opacity-90"
            }`}
          />
        </button>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.includes("Амжилттай") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
