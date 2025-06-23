"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { Switch } from "@/components/ui/switch";
import IndividualComponent from "./IndividualComponent";
import AdminComponent from "./AdminComponent";

export default function RoleSwitcher() {
  const { role } = useUser();
  const [isIndividual, setIsIndividual] = useState(false);

  useEffect(() => {
    setIsIndividual(role !== "ADMIN");
  }, [role]);

  const toggleMode = () => {
    setIsIndividual(!isIndividual);
  };

  if (role !== "ADMIN") {
    return null;
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col items-center gap-2">
        <Switch checked={isIndividual} onCheckedChange={toggleMode} />
        <span className="text-sm text-gray-600">
          {isIndividual ? <IndividualComponent /> : <AdminComponent />}
        </span>
      </div>
    </div>
  );
}
