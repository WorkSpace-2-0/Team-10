"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Demo = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const router = useRouter();

  const callApi = async (url: string, successMsg: string) => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await axios.post(url);
      if (response.data.success) {
        setMessage(successMsg);
        setStep((prev) => prev + 1);
      } else {
        setMessage("Operation failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const refreshAnalytics = () => {
    router.refresh();
    setMessage("Analytics refreshed");
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex flex-col items-center p-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        {/* Buttons */}
        <div className="space-y-4">
          <button
            disabled={loading || step !== 0}
            onClick={() =>
              callApi(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/demo/insertLowMoodStreakAllUsers`,
                "Inserted 5-day low mood streak for all users"
              )
            }
            className={`w-full px-6 py-3 rounded-lg ${
              step === 0 ? "bg-red-600 hover:bg-red-700" : "bg-gray-300"
            } text-white`}
          >
            insert 5 days low streak
          </button>

          <button
            disabled={loading || step !== 1}
            onClick={() =>
              callApi(
                "http://localhost:9999/api/demo/insertPeriodicLowMoodAllUsers",
                "Inserted periodic low mood data for all users"
              )
            }
            className={`w-full px-6 py-3 rounded-lg ${
              step === 1 ? "bg-yellow-600 hover:bg-yellow-700" : "bg-gray-300"
            } text-white`}
          >
            insert 2 week and month low mood
          </button>

          <button
            disabled={loading || step !== 2}
            onClick={() =>
              callApi(
                "http://localhost:9999/api/demo/triggerAlerts",
                "Demo alerts triggered"
              )
            }
            className={`w-full px-6 py-3 rounded-lg ${
              step === 2 ? "bg-green-600 hover:bg-green-700" : "bg-gray-300"
            } text-white`}
          >
            trigger
          </button>

          <button
            disabled={loading || step !== 3}
            onClick={refreshAnalytics}
            className={`w-full px-6 py-3 rounded-lg ${
              step === 3 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300"
            } text-white`}
          >
            refresh analyze
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <div className="mt-6 p-4 rounded-lg bg-green-50 text-green-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Demo;
