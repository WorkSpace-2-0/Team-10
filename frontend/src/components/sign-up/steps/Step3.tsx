import React from "react";
import Image from "next/image";

type Step3Props = {
  errors: any;
  touched: any;
  values: any;
  setFieldValue: (field: string, value: any) => void;
};

const activities = [
  { label: "🧩 Асуудал шийдвэрлэх тоглоомууд", value: "problemSolving" },
  { label: "🎮 Нөхөрсөг тоглоомууд", value: "friendlyGames" },
  { label: "🍕 Хоолонд орж чиллэх", value: "eatingOut" },
  { label: "🎨 Бүтээлч үйл ажиллагаанууд", value: "creativeActivities" },
  { label: "🏃‍♀️ Хөдөлгөөнтэй зүйлс хийх", value: "activeThings" },
  { label: "🎬 Хамтдаа кино үзэж хэлэлцэх", value: "watchMovies" },
];

const Step3GoingOut = ({
  errors,
  touched,
  values,
  setFieldValue,
}: Step3Props) => {
  const selected: string[] = values.goingOut || [];

  const toggleSelection = (value: string) => {
    let updated: string[];
    if (selected.includes(value)) {
      updated = selected.filter((item) => item !== value);
    } else {
      updated = [...selected, value];
    }

    // Update Formik field
    setFieldValue("goingOut", updated);
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
        {/* Cloud + Title */}
        <div className="flex flex-col items-center gap-2">
          <Image src="/images/logo.png" alt="Cloud" width={100} height={100} />
          <div className="bg-white px-4 py-2 rounded-xl shadow text-center text-gray-800 max-w-md text-base font-medium">
            Танд ямар багийн үйл ажиллагаа илүү таалагддаг вэ?
          </div>
          <p className="text-gray-500 text-sm">Дуртай бүгдээ сонгоорой</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          {activities.map((activity) => {
            const isSelected = selected.includes(activity.value);
            return (
              <div
                key={activity.value}
                onClick={() => toggleSelection(activity.value)}
                className={`cursor-pointer bg-white rounded-xl px-4 py-3 text-gray-700 shadow transition border-2 ${
                  isSelected ? "border-blue-500" : "border-transparent"
                } hover:border-blue-300`}
              >
                {activity.label}
              </div>
            );
          })}
        </div>

        {/* Error */}
        {errors.goingOut && touched.goingOut && (
          <div className="text-red-500 text-sm">{errors.goingOut}</div>
        )}
      </div>
    </div>
  );
};

export default Step3GoingOut;
