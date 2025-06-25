"use client";

import { Switch } from "@/components/ui/switch";

type SwitcherType = {
  isIndividual?: boolean;
  toggleMode?: () => void;
};

const RoleSwitcher = ({ isIndividual, toggleMode }: SwitcherType) => {
  return (
    <div className="flex flex-col items-center gap-2 cursor-pointer">
      <Switch checked={isIndividual} onCheckedChange={toggleMode} />
    </div>
  );
};

export default RoleSwitcher;
