import express from "express";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { User } from "../models/user.model";
import { moodEntry } from "../models/mood.entry";
import {
  sendStreakAlertIfNeeded,
  sendPeriodicAlertIfNeeded,
} from "../services/moodAlertService";

dayjs.extend(utc);

export const demoRouter = express.Router();

// Insert 5-day low mood streak for all users
demoRouter.post("/demo/insertLowMoodStreakAllUsers", async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1 }).lean();
    const now = dayjs().utc().startOf("day");
    const entries = [];

    for (const user of users) {
      let date = now.subtract(1, "day");
      let count = 0;
      while (count < 5) {
        if (date.day() !== 0 && date.day() !== 6) {
          entries.push({
            userId: user._id,
            moodScore: 3, // low mood
            createdAt: date.toDate(),
          });
          count++;
        }
        date = date.subtract(1, "day");
      }
    }

    await moodEntry.insertMany(entries);
    res.json({
      success: true,
      message: "Inserted 5-day low mood streak for all users",
    });
  } catch (error) {
    console.error("Error inserting low mood streak data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to insert low mood streak data",
    });
  }
});

// Insert periodic low mood data for all users (last 2 weeks)
demoRouter.post("/demo/insertPeriodicLowMoodAllUsers", async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1 }).lean();
    const now = dayjs().utc().startOf("day");
    const entries = [];

    for (const user of users) {
      for (let i = 0; i <= 14; i += 3) {
        const d = now.subtract(i, "day");
        if (d.day() !== 0 && d.day() !== 6) {
          entries.push({
            userId: user._id,
            moodScore: 4, // low mood
            createdAt: d.toDate(),
          });
        }
      }
    }

    await moodEntry.insertMany(entries);
    res.json({
      success: true,
      message: "Inserted periodic low mood data for all users",
    });
  } catch (error) {
    console.error("Error inserting periodic low mood data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to insert periodic low mood data",
    });
  }
});

demoRouter.post("/demo/triggerAlerts", async (req, res) => {
  try {
    await sendStreakAlertIfNeeded(true);
    await sendPeriodicAlertIfNeeded(true);
    res.json({ success: true, message: "Demo alerts triggered" });
  } catch (error) {
    console.error("Error triggering demo alerts:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to trigger demo alerts" });
  }
});
