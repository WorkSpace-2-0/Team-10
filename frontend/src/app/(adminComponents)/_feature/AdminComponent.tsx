"use client";

import { useUser } from "src/contexts/UserContext";
import AdminAnalytics from "../_components/Analytics/AdminAnalytics";
import ProfileAnalytics from "../_components/ProfileAnalytic/ProfileAnalytics";

export default function AdminComponent() {
  return (
    <div className=" mt-[54px] flex flex-col gap-[60px]  w-screen h-screen">
      <ProfileAnalytics />
      <AdminAnalytics />
    </div>
  );
}
