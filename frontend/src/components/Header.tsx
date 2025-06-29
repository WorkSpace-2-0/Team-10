"use client";

import RoleSwitcher from "./RoleSwitcher";
import { useRouter } from "next/navigation";
import MoodlyLogo from "./ui/MoodlyLogo";
import ProfileSVG from "./ui/ProfileSVG";
type PropsType = {  
  toggleMode?: () => void;
  isIndividual?: boolean;
};
const Header = ({ toggleMode, isIndividual }: PropsType) => {
  const router = useRouter();

  return (
    <div className=" w-screen  h-[64px] flex items-center justify-center cursor-default">
      <div className="max-w-7xl w-full h-full flex justify-between">
        <button
          className="flex justify-center items-center gap-1 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <MoodlyLogo />
          <h1 className="text-[20px]">Moodly</h1>
        </button>
        <div className="flex justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-2">
            <p className="text-[12px] text-neutral-800">Хувь хүн</p>
            <RoleSwitcher isIndividual={isIndividual} toggleMode={toggleMode} />
            <p className="text-[12px] text-neutral-800">Админ</p>
          </div>
          <div className="flex justify-center items-center gap-2">
            {isIndividual ? (
              <button
                onClick={() => router.push("/team-managment")}
                className="text-[14px] text-neutral-900 p-3 cursor-pointer"
              >
                Баг менежмент
              </button>
            ) : (
              <button
                onClick={() => router.push("/note")}
                className="text-[14px] text-neutral-900 p-3 cursor-pointer"
              >
                Тэмдэглэл
              </button>
            )}
            <button
              onClick={() => router.push("/profile")}
              className="cursor-pointer"
            >
              <ProfileSVG />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
