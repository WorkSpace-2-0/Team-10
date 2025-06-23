"use client";

import RoleSwitcher from "./RoleSwitcher";
import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import IndividualComponent from "../app/(userComponents)/_feature/IndividualComponent";
import AdminComponent from "../app/(adminComponents)/_feature/AdminComponent";
import { useRouter } from "next/navigation";

const Header = () => {
  const { role } = useUser();
  const [isIndividual, setIsIndividual] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsIndividual(role !== "ADMIN");
  }, [role]);

  if (role !== "ADMIN") {
    return null;
  }
  const toggleMode = () => {
    setIsIndividual(!isIndividual);
  };

  return (
    <div className="w-full h-[100px] bg-red-500 flex flex-col">
      <div className="flex">
        <RoleSwitcher isIndividual={isIndividual} toggleMode={toggleMode} />
        <button onClick={() => router.push("/profile")}>Profile</button>
      </div>

      <div>
        <span className="text-sm text-gray-600">
          {isIndividual ? <AdminComponent /> : <IndividualComponent />}
        </span>
      </div>
    </div>
  );
};

export default Header;
