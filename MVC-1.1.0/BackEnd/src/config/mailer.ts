import nodemailer from "nodemailer";
import "dotenv/config";

/**
 * This function creates and configure the transporter to send emails
 */
export const tranporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.PASS_MAIL,
  },
});

/**
 * This function verifys if the transportes is ready to send emails
 */
tranporter.verify().then(() => {
  console.log("ready for send emails");
});