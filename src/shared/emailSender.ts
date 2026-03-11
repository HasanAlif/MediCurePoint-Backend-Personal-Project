import nodemailer from "nodemailer";
import config from "../config/index.js";

let transporter: nodemailer.Transporter | null = null;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.emailSender.email,
        pass: config.emailSender.app_pass,
      },
    });
  }
  return transporter;
};

const emailSender = async (
  to: string,
  html: string,
  subject: string,
): Promise<void> => {
  if (!config.emailSender.email || !config.emailSender.app_pass) {
    console.warn("Email credentials not configured. Email not sent.");
    return;
  }

  await getTransporter().sendMail({
    from: `"${config.site_name || "DoctorPoint"}" <${config.emailSender.email}>`,
    to,
    subject,
    html,
  });
};

export default emailSender;
