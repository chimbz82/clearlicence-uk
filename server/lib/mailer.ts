import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD,
  },
});

export const sendPaymentAlert = async (data: {
  amount: number;
  tier: string;
  email: string;
  sessionId: string;
  timestamp: string;
}) => {
  const recipients = [
    process.env.ALERT_EMAIL_1,
    process.env.ALERT_EMAIL_2,
  ].filter(Boolean) as string[];

  const mailOptions = {
    from: `"ClearLicence Payments" <${process.env.ZOHO_EMAIL}>`,
    to: recipients.join(', '),
    subject: `NEW CLEARLICENCE PAYMENT — £${data.amount}`,
    html: `
      <h2>New Payment Received</h2>
      <p><strong>Tier:</strong> ${data.tier}</p>
      <p><strong>Amount:</strong> £${data.amount}</p>
      <p><strong>Customer Email:</strong> ${data.email}</p>
      <p><strong>Stripe Session ID:</strong> ${data.sessionId}</p>
      <p><strong>Timestamp:</strong> ${data.timestamp}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
