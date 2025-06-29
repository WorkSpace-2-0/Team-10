import React from "react";
import Image from "next/image";

type Step5Props = {
  errors: any;
  touched: any;
  values: any;
  setFieldValue: (field: string, value: any) => void;
};

const hobbies = [
  { label: "🏃‍♂️ Дасгал хөдөлгөөнтэй байх", value: "exercise" },
  { label: "🎵 Хөгжим, подкаст сонсох", value: "musicPodcast" },
  { label: "😌 Ганцаараа цагийг өнгөрөөх", value: "aloneTime" },
  { label: "🚫 Дэлгэцнээс түр холдох", value: "screenBreak" },
  { label: "☕ Найзуудаа цагийг өнгөрөөх", value: "socialize" },
  { label: "📚 Сонирхож буй зүйлээ суралцах", value: "learning" },
];

const Step5Hobby = ({ errors, touched, values, setFieldValue }: Step5Props) => {
  const selected: string[] = values.hobby || [];

  const toggleSelection = (value: string) => {
    let updated: string[];

    if (selected.includes(value)) {
      updated = selected.filter((item) => item !== value);
    } else {
      if (selected.length >= 6) return;
      updated = [...selected, value];
    }

    setFieldValue("hobby", updated);
  };

  return (
    <div className="relative flex items-center justify-center h-[600px] px-4">
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

      {/* Foreground */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Cloud + Text */}
        <div className="flex flex-col items-center gap-2">
          <Image src="/images/logo.png" alt="Cloud" width={100} height={100} />
          <div className="bg-white px-4 py-2 rounded-xl shadow text-center text-gray-800 max-w-md text-base font-medium">
            Бараг дууслаа! <br />
            Та ажлын өдөр эрч хүчээ хэрхэн цэнэглэдэг вэ?
          </div>
          <p className="text-gray-500 text-sm">Дуртай бүгдээ сонгоорой</p>
        </div>

        {/* Option Grid */}
        <div className="grid grid-cols-2 gap-4">
          {hobbies.map((item) => {
            const isSelected = selected.includes(item.value);
            return (
              <div
                key={item.value}
                onClick={() => toggleSelection(item.value)}
                className={`cursor-pointer bg-white rounded-xl px-4 py-3 text-gray-700 shadow transition border-2 ${
                  isSelected ? "border-blue-500" : "border-transparent"
                } hover:border-blue-300`}
              >
                {item.label}
              </div>
            );
          })}
        </div>

        {/* Error */}
        {errors.hobby && touched.hobby && (
          <div className="text-red-500 text-sm">{errors.hobby}</div>
        )}
      </div>
    </div>
  );
};

export default Step5Hobby;
