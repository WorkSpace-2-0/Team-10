"use client";

import Header from "../components/Header";
import AdminComponent from "./(adminComponents)/_feature/AdminComponent";
import { useUser } from "../contexts/UserContext";
import { useState, useEffect } from "react";
import IndividualComponent from "./(userComponents)/_feature/IndividualComponent";

export default function Home() {
  const { role } = useUser();
  const [isIndividual, setIsIndividual] = useState(true);

  useEffect(() => {
    setIsIndividual(role !== "ADMIN");
  }, [role]);

  const toggleMode = () => {
    setIsIndividual(!isIndividual);
  };

  return (
    <div className="w-screen h-screen">
      <Header isIndividual={isIndividual} toggleMode={toggleMode} />
      <div>{isIndividual ? <AdminComponent /> : <IndividualComponent />}</div>
    </div>
  );
}
