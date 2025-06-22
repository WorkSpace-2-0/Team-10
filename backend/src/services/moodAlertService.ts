import { User } from "../models/user.model";
import { sendEmail } from "./emailService";
import {
  calculateAverageMood,
  checkLowMoodStreak,
  startOfDay,
  endOfDay,
} from "./moodService";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";

const MOOD_THRESHOLD = 5;
const DEMO_MOOD_THRESHOLD = 7;
const STREAK_DAYS = 3;

export async function sendDailyReminderEmails(demoMode = false): Promise<void> {
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

export async function sendStreakAlertIfNeeded(demoMode = false): Promise<void> {
  const users = await User.find({}, { _id: 1 }).lean();
  const threshold = demoMode ? DEMO_MOOD_THRESHOLD : MOOD_THRESHOLD;

  for (const user of users) {
    console.log(
      `[sendStreakAlertIfNeeded] Checking user ${user._id} with threshold ${threshold}`
    );
    const hasLowMoodStreak = await checkLowMoodStreak(
      user._id.toString(),
      STREAK_DAYS,
      threshold
    );

    if (hasLowMoodStreak) {
      console.log(
        `[sendStreakAlertIfNeeded] User ${user._id} has low mood streak. Sending email.`
      );
      await sendEmail(
        ADMIN_EMAIL,
        "Mood Alert: Low Mood Streak Detected",
        `User ${user._id} has a streak of ${STREAK_DAYS}+ weekdays with average mood below ${threshold}. Please check the dashboard.`
      );
      console.log(`Streak alert email sent for user ${user._id}`);
    }
  }
}

export async function sendPeriodicAlertIfNeeded(
  demoMode = false
): Promise<void> {
  const users = await User.find({}, { _id: 1 }).lean();
  const today = new Date();
  const threshold = demoMode ? DEMO_MOOD_THRESHOLD : MOOD_THRESHOLD;

  for (const user of users) {
    console.log(
      `[sendPeriodicAlertIfNeeded] Checking user ${user._id} with threshold ${threshold}`
    );
    const twoWeeksAgo = new Date(today);
    twoWeeksAgo.setDate(today.getDate() - 14);

    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const twoWeekStart = startOfDay(twoWeeksAgo);
    const monthStart = startOfDay(oneMonthAgo);
    const todayEnd = endOfDay(today);

    const twoWeekAvg = await calculateAverageMood(
      user._id.toString(),
      twoWeekStart,
      todayEnd
    );
    const monthlyAvg = await calculateAverageMood(
      user._id.toString(),
      monthStart,
      todayEnd
    );

    if (twoWeekAvg < threshold) {
      console.log(
        `[sendPeriodicAlertIfNeeded] Sending 2-week alert for user ${user._id}`
      );
      await sendEmail(
        ADMIN_EMAIL,
        "Mood Alert: 2-Week Average Mood Low",
        `User ${user._id} has an average mood of ${twoWeekAvg.toFixed(
          2
        )} over the last 2 weeks. Please review.`
      );
      console.log(`2-week periodic alert sent for user ${user._id}`);
    }

    if (monthlyAvg < threshold) {
      console.log(
        `[sendPeriodicAlertIfNeeded] Sending monthly alert for user ${user._id}`
      );
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
