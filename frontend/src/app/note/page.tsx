"use client";
import Header from "../../components/Header";
import BothSections from "../../components/note/Both";

const Note = () => {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Angular Gradient */}
      <div
        className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 z-0 blur-2xl"
        style={{
          width: 794,
          height: 608,
          borderRadius: "50%",
          background:
            "conic-gradient(from 180deg, #A5E7F4, #E5F7FC, #E5F7FC, #A5E7F4)",
          opacity: 0.35, // Lower opacity for foggy effect
          filter: "blur(24px)", // Extra blur for softness
        }}
      />
      {/* Radial Gradient */}
      <div
        className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 z-0 blur-2xl"
        style={{
          width: 794,
          height: 608,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #FCD0FD 0%, #EDE0FA 70%, #FCD0FD 100%)",
          opacity: 0.25, // Lower opacity for foggy effect
          mixBlendMode: "lighten", // Softer blend
          filter: "blur(32px)", // Extra blur for softness
        }}
      />
      <Header />
      <div className="w-full h-full bg-[#FAFAFA] flex justify-center pt-10 relative z-10">
        <div className="hidden lg:block px-[20rem]">
          <div className="text-start justify-start pb-[28px] text-neutral-400 text-lg font-medium leading-tight">
            Таны тэмдэглэлийг зөвхөн та л харах боломжтой.
          </div>
          <BothSections />
        </div>
      </div>
    </div>
  );
};
export default Note;
