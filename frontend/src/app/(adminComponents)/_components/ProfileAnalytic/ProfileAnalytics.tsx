import { useEffect, useState } from "react";
import axios from "axios";

type TopStat = {
  answer: string;
  percent: number;
  description: string;
};

type StatsResponse = {
  rechargeMethods: TopStat;
  teamActivities: TopStat;
  workplaceValues: TopStat;
};

// ✅ Correct translations here
const translate: Record<string, string> = {
  rechargeMethods: "Цэнэг авах арга",
  teamActivities: "Багийн үйл ажиллагаа",
  workplaceValues: "Ажлын орчны үнэт зүйлс",
};

const ProfileAnalytics = () => {
  const [stats, setStats] = useState<StatsResponse | null>(null);

  useEffect(() => {
    axios.get("http://localhost:9999/stats/getTopChoice").then((res) => {
      setStats(res.data);
      console.log(res.data);
    });
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col ">
      <div className="max-w-7xl w-full flex flex-col gap-9 p-6">
        <div className="flex gap-6 items-center">
          <h1 className="text-3xl">Санал болгох үйл ажиллагаанууд</h1>
          <div className="py-1.5 px-3 bg-[#E2EBFE] border border-[#6396F8] rounded-4xl">
            <p className="text-[14px]">Багийн профайл дээр суурилсан</p>
          </div>
        </div>
        <div className=" h-auto flex justify-between">
          {Object.entries(stats).map(([key, stat]) => (
            <div
              key={key}
              className="border rounded-xl w-[387px] h-[164px] flex flex-col gap-2 iteam-center p-8 shadow-sm hover:border-blue-400 transition-all"
            >
              <h3 className="text-lg mb-1 text-[18px]">
                {translate[key] ?? key}
              </h3>
              <p className="text-[26px]">{stat.answer}</p>
              <p className="text-neutral-500 text-[16px]">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileAnalytics;
