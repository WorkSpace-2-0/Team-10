"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SuccessScreen = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/"); // Dashboard руу шилжинэ
  };

  return (
    <div className="relative flex flex-col items-center justify-center px-4 h-[600px]">
      {/* Background */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <Image
          src="/images/Eclipse1.png"
          width={765}
          height={573}
          alt=""
          className="object-contain"
        />
      </div>

      {/* Message bubble */}
      <div className="bg-white px-6 py-3 rounded-xl shadow-md text-center text-gray-800 text-lg font-medium relative mb-4 max-w-md z-10">
        Та профайлаа амжилттай үүсгэлээ.
        <br />
        Баяр хүргэе!
        <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
      </div>

      {/* Logo */}
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={120}
        height={120}
        className="z-10"
      />

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="absolute bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow z-10"
      >
        Үргэлжлүүлэх
      </button>
    </div>
  );
};

export default SuccessScreen;
