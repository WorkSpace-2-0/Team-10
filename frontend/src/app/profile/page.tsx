"use client";

import Header from "../../components/Header";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
  preferredActivities: string[];
  workValues: string[];
  energyBoosts: string[];
}

const Profile = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "Туяара",
    email: "tuyara@nest.edu.mn",
    password: "************",
    preferredActivities: [
      "Асуудал шийдвэрлэх тоглоомууд",
      "Хөдөлгөөнтэй зүйлс хийх",
    ],
    workValues: [
      "Багийн дотно уур амьсгал",
      "Суралцах, дэвших боломжууд",
      "Ажлын уянзмж",
    ],
    energyBoosts: ["Хөгжим эсвэл подкаст сонсох", "Ганцаараа цагийг өнгөрөөх"],
  });

  const toggleSelect = (
    field: keyof Pick<
      FormData,
      "preferredActivities" | "workValues" | "energyBoosts"
    >,
    value: string,
    max = 99
  ) => {
    const current = formData[field];
    const exists = current.includes(value);
    const updatedValues = exists
      ? current.filter((v) => v !== value)
      : current.length < max
      ? [...current, value]
      : current;

    setFormData({ ...formData, [field]: updatedValues });
  };

  const handleChange =
    (
      field: keyof Omit<
        FormData,
        "preferredActivities" | "workValues" | "energyBoosts"
      >
    ) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const activityOptions = [
    "Асуудал шийдвэрлэх тоглоомууд",
    "Хоолонд орж чиллэх",
    "Хөдөлгөөнтэй зүйлс хийх",
    "Невроог тоглоомууд",
    "Бүтээлч үйл ажиллагаанууд",
    "Хамтдаа кино үзэх хэлэлцэх",
  ];

  const workValues = [
    "Багийн дотно уур амьсгал",
    "Суралцах, дэвших боломжууд",
    "Бүтээл, тодорхой байдал",
    "Ажлын уянзмж",
    "Биеэ даасан байдал, эрх чөлөө",
    "Үр нөлөөтэй байдал",
  ];

  const energyOptions = [
    "Хөгжим эсвэл подкаст сонсох",
    "Дасгал хөдөлгөөнтэй байх",
    "Ганцаараа цагийг өнгөрөөх",
    "Найзтайгаа уулзаж ярилцах",
    "Дэлгүүрээс турш худалдан авалт хийх",
    "Сонирхолтой зүйлс суралцах",
  ];

  const renderChips = (
    options: string[],
    field: keyof Pick<
      FormData,
      "preferredActivities" | "workValues" | "energyBoosts"
    >,
    max = 99
  ) => (
    <div className="flex flex-wrap gap-2">
      {options.map((item) => (
        <button
          key={item}
          type="button"
          className={`px-3 py-1 rounded-full border text-sm transition ${
            formData[field].includes(item)
              ? "bg-white border-blue-500 text-blue-600"
              : "border-neutral-300 text-neutral-600"
          }`}
          onClick={() => toggleSelect(field, item, max)}
        >
          {item}
        </button>
      ))}
    </div>
  );

  return (
    <div>
      <Header />
      <form
        onSubmit={handleSubmit}
        className="w-screen h-screen bg-neutral-100 flex justify-center pt-20 pb-12 px-6"
      >
        <div className="w-[1104px] bg-white p-8 rounded-xl  space-y-6">
          <h1 className="text-2xl font-semibold">Таны мэдээлэл</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-5">
              {(
                [
                  {
                    label: "Танийг хэн гэж дууддаг вэ?",
                    field: "name",
                    type: "text",
                  },
                  { label: "Таны и-мэйл хаяг", field: "email", type: "email" },
                  {
                    label: "Таны нууц үг",
                    field: "password",
                    type: "password",
                  },
                ] as {
                  label: string;
                  field: "name" | "email" | "password";
                  type: string;
                }[]
              ).map(({ label, field, type }) => (
                <div key={field}>
                  <label className="text-sm mb-1 block font-medium">
                    {label}
                  </label>
                  <input
                    type={type}
                    className="w-full border p-2 rounded"
                    value={formData[field]}
                    onChange={handleChange(field)}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm mb-1 font-medium">
                  Танд ямар багийн үйл ажиллагаа илүү таалагддаг вэ?
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  Дуртай бүхнээ сонгоорой
                </p>
                {renderChips(activityOptions, "preferredActivities")}
              </div>
              <div>
                <p className="text-sm mb-1 font-medium">
                  Та ажлын газрынхаа юуг илүү үнэлдэг вэ?
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  3 хүртэлхийг сонгоорой
                </p>
                {renderChips(workValues, "workValues", 3)}
              </div>
              <div>
                <p className="text-sm mb-1 font-medium">
                  Та ажлын өдөр эрч хүчээ хэрхэн цэнэглэдэг вэ?
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  Дуртай бүхнээ сонгоорой
                </p>
                {renderChips(energyOptions, "energyBoosts")}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="bg-gradient-to-b from-[#AAC9FF] to-[#6D9BFF] text-white px-10 py-2 rounded-xl"
            >
              Хадгалах
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
