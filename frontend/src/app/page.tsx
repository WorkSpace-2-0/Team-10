"use client";

import { useUser } from "@/contexts/UserContext";
import RoleSwitcher from "@/components/RoleSwitcher";
import AdminComponent from "@/components/AdminComponent";
import IndividualComponent from "@/components/IndividualComponent";

export default function Home() {
  const { name, role, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, {name}</h1>
          <RoleSwitcher />
        </div>
      </div>
    </div>
  );
}
