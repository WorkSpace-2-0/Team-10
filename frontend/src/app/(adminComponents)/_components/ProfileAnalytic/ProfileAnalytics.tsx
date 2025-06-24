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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {Object.entries(stats).map(([key, stat]) => (
        <div
          key={key}
          className="border rounded-xl p-4 shadow-sm hover:border-blue-400 transition-all"
        >
          <h3 className="text-lg font-semibold mb-1">
            {translate[key] ?? key}
          </h3>
          <p className="text-sm text-gray-700">{stat.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileAnalytics;
