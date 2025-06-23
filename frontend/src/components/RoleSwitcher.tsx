"use client";

import { Switch } from "@/components/ui/switch";

const RoleSwitcher = ({ isIndividual, toggleMode }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Switch checked={isIndividual} onCheckedChange={toggleMode} />
    </div>
  );
};

export default RoleSwitcher;
