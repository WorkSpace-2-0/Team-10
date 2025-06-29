import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  text: string
): Promise<void> {
  if (!to) {
    throw new Error("No recipient email address provided");
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to} with subject "${subject}"`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
