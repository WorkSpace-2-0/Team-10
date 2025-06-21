// import cron from "node-cron";
// import {
//   sendDailyReminderEmails,
//   sendStreakAlertIfNeeded,
//   sendPeriodicAlertIfNeeded,
// } from "../services/moodAlertService";

// export function startMoodAlertScheduler(): void {
//   // Schedule to run every weekday (Mon-Fri) at 11:00 AM
//   cron.schedule("0 11 * * 1-5", async () => {
//     console.log("Mood alert scheduler started at", new Date().toISOString());

//     try {
//       // Send daily reminders to users
//       await sendDailyReminderEmails();

//       // Check and send streak alert if needed
//       await sendStreakAlertIfNeeded();

//       // Check and send periodic alerts if needed
//       await sendPeriodicAlertIfNeeded();

//       console.log("Mood alert scheduler finished successfully.");
//     } catch (error) {
//       console.error("Error in mood alert scheduler:", error);
//     }
//   });
// }
