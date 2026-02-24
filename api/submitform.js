export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, budget, brief } = req.body;

  try {
    // 1. Send Email via Resend
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'codeanix01@gmail.com',
        from: 'vedanth1208@gmail.com',
        subject: 'New Project Inquiry',
        html: `
          <h2>New Codeanix Project Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <p><strong>Brief:</strong> ${brief}</p>
        `
      })
    });

    // 2. Send WhatsApp via Meta Business API
    await fetch(`https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: "91733762008", // your business number with country code
        type: "text",
        text: {
          body: `🚀 New Codeanix Project Request\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nBudget: ${budget}\nBrief: ${brief}`
        }
      })
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send form data' });
  }
}
