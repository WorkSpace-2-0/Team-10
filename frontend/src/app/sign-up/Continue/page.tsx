"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "src/components/Header";

const SuccessScreen = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/");
  };

  return (
    <>
      <Header />
      <div className="relative flex flex-col items-center justify-center px-4 h-[600px]">
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <Image
            src="/images/Eclipse1.png"
            width={765}
            height={573}
            alt=""
            className="object-contain"
          />
        </div>

        <div className="bg-white px-6 py-3 rounded-xl shadow-md text-center text-gray-800 text-lg font-medium relative mb-4 max-w-md z-10">
          Таны сэтгэлзүйн байдал удирдлагад багийн дундажаар л харагдах тул
          бодитоор бөглөхөөс битгий айгаарай.
        </div>

        <Image
          src="/images/logo.png"
          alt="Logo"
          width={120}
          height={120}
          className="z-10"
        />

        <button
          onClick={handleContinue}
          className="absolute bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow z-10"
        >
          Үргэлжлүүлэх
        </button>
      </div>
    </>
  );
};

export default SuccessScreen;
