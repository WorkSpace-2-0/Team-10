// import { sendEmail } from './emailService';
// import { calculateAverageMood, checkLowMoodStreak } from './moodService';

// const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';

// // Thresholds
// const MOOD_THRESHOLD = 5;
// const STREAK_DAYS = 3;

// export async function sendDailyReminderEmails(): Promise<void> {
//   // TODO: Fetch all users' emails from your DB
//   const users = ['user1@example.com', 'user2@example.com']; // Replace with real users

//   for (const userEmail of users) {
//     await sendEmail(
//       userEmail,
//       'Daily Mood Tracker Reminder',
//       'Please remember to log your mood today!'
//     );
//   }
//   console.log('Daily reminder emails sent.');
// }

// export async function sendStreakAlertIfNeeded(): Promise<void> {
//   const hasLowMoodStreak = await checkLowMoodStreak(STREAK_DAYS, MOOD_THRESHOLD);
//   if (hasLowMoodStreak) {
//     await sendEmail(
//       ADMIN_EMAIL,
//       'Mood Alert: Low Mood Streak Detected',
//       `There is a streak of ${STREAK_DAYS}+ weekdays with average mood below ${MOOD_THRESHOLD}. Please check the dashboard.`
//     );
//     console.log('Streak alert email sent to admin.');
//   }
// }

// export async function sendPeriodicAlertIfNeeded(): Promise<void> {
//   const today = new Date();

//   // Calculate 2-week average mood
//   const twoWeeksAgo = new Date(today);
//   twoWeeksAgo.setDate(today.getDate() - 14);
//   const twoWeekAvg = await calculateAverageMood(twoWeeksAgo, today);

//   // Calculate monthly average mood
//   const oneMonthAgo = new Date(today);
//   oneMonthAgo.setMonth(today.getMonth() - 1);
//   const monthlyAvg = await calculateAverageMood(oneMonthAgo, today);

//   if (twoWeekAvg < MOOD_THRESHOLD) {
//     await sendEmail(
//       ADMIN_EMAIL,
//       'Mood Alert: 2-Week Average Mood Low',
//       `The average mood over the last 2 weeks is ${twoWeekAvg.toFixed(2)}. Please review.`
//     );
//     console.log('2-week periodic alert sent.');
//   }

//   if (monthlyAvg < MOOD_THRESHOLD) {
//     await sendEmail(
//       ADMIN_EMAIL,
//       'Mood Alert: Monthly Average Mood Low',
//       `The average mood over the last month is ${monthlyAvg.toFixed(2)}. Please review.`
//     );
//     console.log('Monthly periodic alert sent.');
//   }
// }
