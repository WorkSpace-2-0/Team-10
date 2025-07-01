import { useEffect, useState } from "react";
import axios from "axios";

type TopStat = {
  answer: string;
  percent: number;
  description: string;
};

type StatsResponse = {
  goingOut: TopStat;
  weekend: TopStat;
  hobby: TopStat;
};

// 🧠 Mapping for display
const LABELS: Record<
  string,
  { emoji: string; label: string; description: (percent: number) => string }
> = {
  watchMovies: {
    emoji: "🎬",
    label: "Кино үзэх",
    description: (p) => `Багийн ${p}% нь кино үзэх дуртай гэсэн.`,
  },
  coffeeDate: {
    emoji: "☕",
    label: "Кофе болзоо",
    description: (p) => `Багийн ${p}% нь гадуур гарч ярилцах дуртай гэсэн.`,
  },
  hiking: {
    emoji: "🏔",
    label: "Ууланд гарах",
    description: (p) => `Багийн ${p}% нь байгальд гарах дуртай гэсэн.`,
  },
  foodOut: {
    emoji: "🍱",
    label: "Хоолонд орох",
    description: (p) => `Багийн ${p}% нь хоолонд орж чиллэх дуртай гэсэн.`,
  },
  impact: {
    emoji: "🌍",
    label: "Нөлөө үзүүлэх",
    description: (p) =>
      `Багийн ${p}% нь нийгэмд эерэг нөлөө үзүүлэхийг чухалчилдаг.`,
  },
  fun: {
    emoji: "🎉",
    label: "Зугаатай байх",
    description: (p) => `Багийн ${p}% нь хөгжилтэй орчинд дуртай гэсэн.`,
  },
  learning: {
    emoji: "📚",
    label: "Шинэ зүйл сурах",
    description: (p) => `Багийн ${p}% нь шинэ зүйлс сурч хөгжих сонирхолтой.`,
  },
  sports: {
    emoji: "⚽",
    label: "Спорт",
    description: (p) => `Багийн ${p}% нь спортоор хичээллэх дуртай.`,
  },
  // 👇 ШИНЭЭР НЭМЖ БАЙНА
  friendlyGames: {
    emoji: "🎮",
    label: "Найзтайгаа тоглох",
    description: (p) =>
      `Багийн ${p}% нь найзтайгаа хөгжилтэй тоглоом тоглох дуртай гэсэн.`,
  },
};

const ProfileAnalytics = () => {
  const [stats, setStats] = useState<StatsResponse | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/stats/getTopChoice`)
      .then((res) => {
        setStats(res.data);
      });
  }, []);

  if (!stats) return <div>Loading...</div>;

  const data = [
    {
      key: "goingOut",
      ...stats?.goingOut,
    },
    {
      key: "weekend",
      ...stats?.weekend,
    },
    {
      key: "hobby",
      ...stats?.hobby,
    },
  ];

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <div className="max-w-7xl w-full flex flex-col gap-9 p-6">
        <div className="flex gap-6 items-center">
          <h1 className="text-3xl">Санал болгох үйл ажиллагаанууд</h1>
          <div className="py-1.5 px-3 bg-[#E2EBFE] border border-[#6396F8] rounded-4xl">
            <p className="text-[14px]">Багийн профайл дээр суурилсан</p>
          </div>
        </div>

        <div className="flex justify-between w-full">
          {data.map((item) => {
            const meta = LABELS[item.answer];

            if (!meta) return null;

            return (
              <div
                key={item.key}
                className="border rounded-xl w-[387px] h-[164px] flex flex-col gap-2 justify-center p-8 shadow-sm hover:border-blue-400 transition-all"
              >
                <div className="flex gap-2 items-center text-[18px]">
                  <span className="text-2xl">{meta.emoji}</span>
                  <span className="font-medium">{meta.label}</span>
                </div>
                <p className="text-neutral-500 text-[16px]">
                  {meta.description(item.percent)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileAnalytics;
