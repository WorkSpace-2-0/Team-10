

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import MoodSlider from "./Slider";

type MoodEntryProps = {
  onSuccess?: () => void;
  userName: string;
};

const moods = ["Angry", "Sad", "Neutral", "Happy", "Ecstatic"];
const moodEmoji = ["😢", "😞", "🙂", "😊", "😄"];

export default function MoodForm({ onSuccess, userName }: MoodEntryProps) {
  const [mood, setMood] = useState(2);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const userId = "68597d890e5c6aa50243a223";
  const BACKEND_URL = "http://localhost:9999";

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/mood/newMood/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ moodScore: mood, note }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Алдаа гарлаа");
      }

      setMessage("Амжилттай хадгалагдлаа!");
      setMood(2);
      setNote("");

      if (onSuccess) onSuccess();
    } catch (error: any) {
      setMessage(error.message || "Сервертэй холбогдоход алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <h2 className="text-gray-600 text-lg mb-1">Сайн уу, {userName}</h2>
        <h1 className="text-2xl font-semibold mb-6">
          Та өнөөдөр ямар сэтгэгдэлтэй байна вэ?
        </h1>

        {/* <div className="text-[64px] mb-2">{moodEmoji[mood]}</div> */}
        <div className="text-base font-medium text-gray-700 mb-6">
          {moods[mood]}
        </div>

        <MoodSlider value={mood} onChange={setMood} />

        <p className="text-sm text-gray-400 mb-6 mt-6">
          Таны тэмдэглэл зөвхөн танд л харагдах болно.
          <br /> Багийн менежерт багийн нийт оноо л харагдана.
        </p>

        <p className="text-base font-semibold text-black-600 mb-2">
          Тэмдэглэл үлдээх (заавал биш)
        </p>

        <Textarea
          placeholder="Би өнөөдөр..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-4 text-center w-full"
          rows={3}
        />

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-md shadow-md"
        >
          {loading ? "Хадгалж байна..." : "Хадгалах"}
        </Button>

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
