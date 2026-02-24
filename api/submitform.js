const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  const { name, email, phone, service, budget, brief } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourgmail@gmail.com",       // your Gmail
      pass: process.env.GMAIL_APP_PASS   // app password from Vercel
    }
  });

  await transporter.sendMail({
    from: "vedanth.s.12.12@gmail.com",         // sender Gmail
    to: "codeanix01@gmail.com",           // recipient Gmail
    subject: "New Project Inquiry",
    html: `
      <h2>New Codeanix Project Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Budget:</strong> ${budget}</p>
      <p><strong>Brief:</strong> ${brief}</p>
    `
  });

  res.status(200).json({ success: true });
}
