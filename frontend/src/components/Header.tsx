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
    <div className=" w-screen  h-[64px] bg-white flex items-center justify-center cursor-default">
      <div className="max-w-7xl w-full h-full flex justify-between">
        <button
          className="flex justify-center items-center gap-1 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <MoodlyLogo />
          <h1 className="text-black text-center font-inter text-[20px] font-medium leading-[120%] tracking-normal">Moodly</h1>
        </button>
        <div className="flex justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-2">
            <p className="text-neutral-900 text-center font-inter text-sm font-medium text-[14px] leading-[142.857%] tracking-normal">Хувь хүн</p>
            <RoleSwitcher isIndividual={isIndividual} toggleMode={toggleMode} />
            <p className="text-neutral-900 text-center font-inter text-sm font-medium text-[14px] leading-[142.857%] tracking-normal">Админ</p>
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
                className="text-neutral-900 text-center font-inter text-sm font-medium leading-[142.857%] tracking-normal text-[14px] text-neutral-900 p-3 cursor-pointer"
              >
                Тэмдэглэл
              </button>
            )}
            <button
              onClick={() => router.push("/profile")}
              className="cursor-pointer "
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
