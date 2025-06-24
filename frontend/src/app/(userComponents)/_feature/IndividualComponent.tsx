"use client";

import UserAnalytics from "../_components/Analytics/UserAnalytics";
import MoodEntry from "../_components/MoodEntry";
UserAnalytics;

export default function IndividualComponent() {
  return (
    <div className=" w-full h-full mt-[100px] flex-col flex justify-center">
      <MoodEntry />
      <UserAnalytics />
    </div>
  );
}
