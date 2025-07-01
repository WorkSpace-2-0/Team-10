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
  const [moodTitle, setMoodTitle] = useState<string | undefined>();
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
      setMoodTitle(undefined);
      setNote("");

      if (onSuccess) onSuccess();
    } catch (error: any) {
      setMessage(error.message || "Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full bg-gray-100 flex items-center justify-center text-center m-0 p-0">
      <div className="w-full flex flex-col justify-center items-center bg-white border-b rounded-bl-[100px] rounded-br-[100px] m-0 p-0 pt-[32px] pb-[44px] overflow-hidden">
        <div className="">
          <h2 className="w-[487px] h-[23px] font-inter font-medium text-[18px] leading-[130%] text-center text-neutral-800">
            Сайн уу, {name}
          </h2>
        </div>

        <div className="mb-[30px]">
          <h1 className="w-[487px] h-[31px] text-[24px] text-[#262626] font-medium leading-[130%] text-center">
            Та өнөөдөр ямар сэтгэгдэлтэй байна вэ?
          </h1>
        </div>

        <div className="w-full max-w-[590px] mb-[12px]">
          <MoodSlider
            value={mood}
            onChange={setMood}
            onMoodTitleChange={setMoodTitle}
          />
        </div>

        <div className="mb-[20px] text-center">
          <img
            src="/images/text.png"
            className="inline-block w-[300px] h-auto object-contain"
          />
        </div>

        <p className="w-[250px] h-[20px] text-center font-medium text-[16px] leading-[20px] text-black mb-[16px]">
          Тэмдэглэл үлдээх (заавал биш)
        </p>

        <div className="w-full flex justify-center">
          <Textarea
            placeholder="Би өнөөдөр..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-[500px] h-[90px] px-3 py-2 box-border bg-[#FAFAFA] border border-[#E5E5E5] rounded-[10px] text-center text-base font-normal placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-[20px] w-full flex justify-center disabled:cursor-not-allowed"
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
            className={`mt-[10px] text-center text-sm ${
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
