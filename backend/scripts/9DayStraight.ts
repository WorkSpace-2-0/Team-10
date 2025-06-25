// import mongoose from "mongoose";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// import { MoodEntry } from "../src/models/mood.entry";

// dayjs.extend(utc);

// const MONGO_URI =
//   "mongodb+srv://workspace20250720:Lxgiwyl0@workspace.sx6rlqf.mongodb.net/";

// const userId = "68567d4fe93a30f6a7174e6a";

// const getMoodTitle = (score: number): string => {
//   const moods = [
//     { label: "Хэцүү", min: 0, max: 2 },
//     { label: "Тавгүй", min: 2, max: 4 },
//     { label: "Хэвийн", min: 4, max: 6 },
//     { label: "Дажгүй шүү", min: 6, max: 8 },
//     { label: "Супер", min: 8, max: 10.01 },
//   ];
//   return moods.find((m) => score >= m.min && score < m.max)?.label || "Хэвийн";
// };

// const seed = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("✅ Connected to MongoDB");

//     const entries = [];
//     let date = dayjs.utc().startOf("day").subtract(1, "day"); // start from yesterday
//     let insertedDays = 0;

//     while (insertedDays < 9) {
//       const dayOfWeek = date.day();
//       if (dayOfWeek !== 0 && dayOfWeek !== 6) {
//         // skip weekends
//         const moodScore = +(Math.random() * 5 + 5).toFixed(1);
//         const moodTitle = getMoodTitle(moodScore);
//         entries.push({
//           userId,
//           moodScore,
//           moodTitle,
//           note: "demo",
//           createdAt: date.toDate(),
//         });
//         insertedDays++;
//       }
//       date = date.subtract(1, "day"); // go back one day
//     }

//     await MoodEntry.insertMany(entries);
//     console.log(
//       `✅ Inserted ${entries.length} mood entries for user ${userId}`
//     );

//     await mongoose.disconnect();
//     console.log("🔌 Disconnected");
//   } catch (error) {
//     console.error("❌ Seed error:", error);
//     process.exit(1);
//   }
// };

// seed();
