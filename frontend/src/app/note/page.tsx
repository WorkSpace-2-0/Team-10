"use client";
import Header from "@/components/Header";
import BothSections from "@/components/note/Both";
const Note = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-auto bg-[#FAFAFA] flex">
        <div className="py-[2.5rem] px-[7.5rem]">
          <div className="text-start justify-start pb-[28px] text-neutral-400 text-lg font-bold font-['Inter'] leading-tight">
            Таны тэмдэглэлийг зөвхөн та л харах боломжтой.
          </div>
          <BothSections />
        </div>
      </div>
    </div>
  );
};
export default Note;
