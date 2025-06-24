"use client";

import AdminAnalytics from "../_components/Analytics/AdminAnalytics";
import ProfileAnalytics from "../_components/ProfileAnalytic/ProfileAnalytics";

export default function AdminComponent() {
  return (
    <div className=" mt-[100px] flex flex-col gap-6  w-screen h-screen">
      <ProfileAnalytics />
      <AdminAnalytics />
    </div>
  );
}
