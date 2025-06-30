import React from "react";
import Image from "next/image";

type Step4Props = {
  errors: any;
  touched: any;
  values: any;
  setFieldValue: (field: string, value: any) => void;
};

const preferences = [
  { label: "🤝 Багийн дотно уур амьсгал", value: "teamAtmosphere" },
  { label: "🧠 Суралцаж, дэвших боломжууд", value: "growthOpportunities" },
  { label: "🏆 Ажлын үнэлэмж", value: "recognition" },
  { label: "🗓️ Бүтэц, тодорхой байдал", value: "clarityStructure" },
  { label: "💡 Биеэ даасан байдал, эрх чөлөө", value: "independence" },
  { label: "📈 Үр нөлөөтэй байдал", value: "impact" },
];

const Step4Weekend = ({
  errors,
  touched,
  values,
  setFieldValue,
}: Step4Props) => {
  const selected: string[] = values.weekend || [];

  const toggleSelection = (value: string) => {
    let updated: string[];
    if (selected.includes(value)) {
      updated = selected.filter((item) => item !== value);
    } else {
      if (selected.length >= 3) return;
      updated = [...selected, value];
    }

    setFieldValue("weekend", updated); // Formik руу утга бичих
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
        {/* Cloud + message */}
        <div className="flex flex-col items-center gap-2">
          <Image src="/images/logo.png" alt="Cloud" width={100} height={100} />
          <div className="bg-white px-4 py-2 rounded-xl shadow text-center text-gray-800 max-w-md text-base font-medium">
            Ажлын орчноос та юуг илүү чухалчилдаг вэ?
          </div>
          <p className="text-gray-500 text-sm">3 хүртэлхийг сонгоорой</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          {preferences.map((item) => {
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
        {errors.weekend && touched.weekend && (
          <div className="text-red-500 text-sm">{errors.weekend}</div>
        )}
      </div>
    </div>
  );
};

export default Step4Weekend;
