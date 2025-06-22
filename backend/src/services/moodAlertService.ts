import { User } from "../models/user.model";
import { sendEmail } from "./emailService";
import { calculateAverageMood, checkLowMoodStreak } from "./moodService";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";

const MOOD_THRESHOLD = 5;
const STREAK_DAYS = 3;

export async function sendDailyReminderEmails(): Promise<void> {
  const users = await User.find({}, { email: 1 }).lean();
  const userEmails = users.map((u) => u.email).filter(Boolean);

  for (const email of userEmails) {
    await sendEmail(
      email,
      "Daily Mood Tracker Reminder",
      "Please remember to log your mood today!"
    );
  }
  console.log("Daily reminder emails sent.");
}

export async function sendStreakAlertIfNeeded(): Promise<void> {
  const users = await User.find({}, { _id: 1 }).lean();

  for (const user of users) {
    const hasLowMoodStreak = await checkLowMoodStreak(
      user._id.toString(),
      STREAK_DAYS,
      MOOD_THRESHOLD
    );

    if (hasLowMoodStreak) {
      await sendEmail(
        ADMIN_EMAIL,
        "Mood Alert: Low Mood Streak Detected",
        `User ${user._id} has a streak of ${STREAK_DAYS}+ weekdays with average mood below ${MOOD_THRESHOLD}. Please check the dashboard.`
      );
      console.log(`Streak alert email sent for user ${user._id}`);
    }
  }
}

export async function sendPeriodicAlertIfNeeded(): Promise<void> {
  const users = await User.find({}, { _id: 1 }).lean();
  const today = new Date();

  for (const user of users) {
    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(today.getDate() - 14);

    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const twoWeekAvg = await calculateAverageMood(
      user._id.toString(),
      twoWeeksAgo,
      today
    );
    const monthlyAvg = await calculateAverageMood(
      user._id.toString(),
      oneMonthAgo,
      today
    );

    if (twoWeekAvg < MOOD_THRESHOLD) {
      await sendEmail(
        ADMIN_EMAIL,
        "Mood Alert: 2-Week Average Mood Low",
        `User ${user._id} has an average mood of ${twoWeekAvg.toFixed(
          2
        )} over the last 2 weeks. Please review.`
      );
      console.log(`2-week periodic alert sent for user ${user._id}`);
    }

    if (monthlyAvg < MOOD_THRESHOLD) {
      await sendEmail(
        ADMIN_EMAIL,
        "Mood Alert: Monthly Average Mood Low",
        `User ${user._id} has an average mood of ${monthlyAvg.toFixed(
          2
        )} over the last month. Please review.`
      );
      console.log(`Monthly periodic alert sent for user ${user._id}`);
    }
  }
}
