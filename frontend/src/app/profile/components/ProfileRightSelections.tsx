import React from "react";

interface Props {
  formData: {
    goingOut: string[];
    weekend: string[];
    hobby: string[];
  };
  toggleSelect: (
    field: "goingOut" | "weekend" | "hobby",
    value: string,
    max?: number
  ) => void;
}

const goingOut: Record<string, string> = {
  watchMovies: "🎬 Хамтдаа кино үзэж хэлэлцэх",
  problemSolving: "🧩 Асуудал шийдвэрлэх тоглоомууд",
  eatingOut: "🍕 Хоолонд орж чиллэх",
  activeThings: "🏃‍♀️ Хөдөлгөөнтэй зүйлс хийх",
  friendlyGames: "🎮 Нөхөрсөг тоглоомууд",
  creativeActivities: "🎨 Бүтээлч үйл ажиллагаанууд",
};

const weekend: Record<string, string> = {
  teamAtmosphere: "🤝 Багийн дотно уур амьсгал",
  growthOpportunities: "🧠 Суралцаж, дэвших боломжууд",
  clarityStructure: "🗓️ Бүтэц, тодорхой байдал",
  recognition: "🏆 Ажлын үнэлэмж",
  independence: "💡 Биеэ даасан байдал, эрх чөлөө",
  impact: "📈 Үр нөлөөтэй байдал",
};

const hobby: Record<string, string> = {
  musicPodcast: "🎵 Хөгжим, подкаст сонсох",
  exercise: "🏃‍♂️ Дасгал хөдөлгөөнтэй байх",
  aloneTime: "😌 Ганцаараа цагийг өнгөрөөх",
  socialize: "☕ Найзуудаа цагийг өнгөрөөх",
  screenBreak: "🚫 Дэлгэцнээс түр холдох",
  learning: "📚 Сонирхож буй зүйлээ суралцах",
};


const ProfileRightSelections = ({ formData, toggleSelect }: Props) => {
  const renderChips = (
    options: Record<string, string>,
    selected: string[],
    field: "goingOut" | "weekend" | "hobby",
    max: number = 99
  ) => (
    <div className="flex flex-wrap gap-2">
      {Object.entries(options).map(([key, label]) => (
        <button
          key={key}
          type="button"
          className={`px-3 py-1 rounded-full border text-sm transition ${
            selected.includes(key)
              ? "bg-white border-blue-500 text-blue-600"
              : "border-neutral-300 text-neutral-600"
          }`}
          onClick={() => toggleSelect(field, key, max)}
        >
          {label}
        </button>
      ))}
    </div>
  );

  console.log(formData, "formData in ProfileRightSelections");
  

  return (
    <div className="space-y-6 w-full">
      {/* Preferred Activities */}
      <div>
        <p className="text-sm mb-1 font-medium">
          Танд ямар багийн үйл ажиллагаа илүү таалагддаг вэ?
        </p>
        <p className="text-xs text-gray-500 mb-2">Дуртай бүхнээ сонгоорой</p>
        {renderChips(goingOut, formData.goingOut, "goingOut")}
      </div>

      {/* Work Values */}
      <div>
        <p className="text-sm mb-1 font-medium">
          Та ажлын газрынхаа юуг илүү үнэлдэг вэ?
        </p>
        <p className="text-xs text-gray-500 mb-2">3 хүртэлхийг сонгоорой</p>
        {renderChips(weekend, formData.weekend, "weekend", 3)}
      </div>

      {/* Energy Boosts */}
      <div>
        <p className="text-sm mb-1 font-medium">
          Та ажлын өдөр эрч хүчээ хэрхэн цэнэглэдэг вэ?
        </p>
        <p className="text-xs text-gray-500 mb-2">Дуртай бүхнээ сонгоорой</p>
        {renderChips(hobby, formData.hobby, "hobby")}
      </div>
    </div>
  );
};

export default ProfileRightSelections;
