import cron from "node-cron";
import {
  sendDailyReminderEmails,
  sendStreakAlertIfNeeded,
  sendPeriodicAlertIfNeeded,
} from "../services/moodAlertService";

export function startMoodAlertScheduler(): void {
  console.log("Starting mood alert scheduler...");
  cron.schedule("* * * * *", async () => {
    console.log("Mood alert scheduler triggered at", new Date().toISOString());
    try {
      await sendDailyReminderEmails();
      await sendStreakAlertIfNeeded();
      await sendPeriodicAlertIfNeeded();
      console.log("Mood alert scheduler finished successfully.");
    } catch (error) {
      console.error("Error in mood alert scheduler:", error);
    }
  });
}
