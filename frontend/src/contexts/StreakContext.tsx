"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
interface StreakContextType {
  streakCount: number | null;
  loading: boolean;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export const useStreak = () => {
  const context = useContext(StreakContext);
  if (!context) throw new Error("useStreak must be used within StreakProvider");
  return context;
};

export const StreakProvider = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useUser();
  const [streakCount, setStreakCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchStreak = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/stats/summary`,
          {
            params: { userId },
          }
        );
        setStreakCount(res.data.streakCount ?? null);
      } catch (err) {
        console.error("Failed to fetch streak count:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStreak();
  }, [userId]);

  return (
    <StreakContext.Provider value={{ streakCount, loading }}>
      {children}
    </StreakContext.Provider>
  );
};
