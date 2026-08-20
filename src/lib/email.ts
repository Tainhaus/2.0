// src/lib/email.ts
// Sends emails via Resend API

interface EnquiryEmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type?: string;
  productInterest?: string;
}

interface ConfiguratorEmailData {
  name: string;
  email: string;
  phone: string;
  cabinType?: string;
  size?: string;
  colour?: string;
  notes?: string;
}

export async function sendEnquiryEmail(data: EnquiryEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[email] RESEND_API_KEY not set");
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0A3D2A; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">New Enquiry — Tainhaus</h1>
      </div>
      <div style="background: #f5f2ec; padding: 24px; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: bold;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          ${data.phone ? `<tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>` : ""}
          ${data.type ? `<tr><td style="padding: 8px 0; color: #666;">Type</td><td style="padding: 8px 0;">${data.type}</td></tr>` : ""}
          ${data.productInterest ? `<tr><td style="padding: 8px 0; color: #666;">Product</td><td style="padding: 8px 0;">${data.productInterest}</td></tr>` : ""}
        </table>
        <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #0A3D2A;">
          <p style="margin: 0; color: #666; font-size: 12px; margin-bottom: 8px;">MESSAGE</p>
          <p style="margin: 0;">${data.message.replace(/\n/g, "<br>")}</p>
        </div>
        <div style="margin-top: 16px; padding: 12px; background: #C26B4A; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: white; font-weight: bold;">⚡ Reply within one working day</p>
        </div>
      </div>
    </div>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Tainhaus Website <onboarding@resend.dev>",
      to: ["info@tainhaus.co.uk"],
      subject: `New Enquiry from ${data.name} — Tainhaus`,
      html,
    }),
  });
}

export async function sendConfiguratorEmail(data: ConfiguratorEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[email] RESEND_API_KEY not set");
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0A3D2A; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">New Quote Request — Design Your Space</h1>
      </div>
      <div style="background: #f5f2ec; padding: 24px; border-radius: 0 0 8px 8px;">
        <h2 style="color: #0A3D2A; font-size: 16px; margin: 0 0 16px;">Customer Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #666; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: bold;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
        </table>
        <h2 style="color: #0A3D2A; font-size: 16px; margin: 20px 0 16px;">Their Requirements</h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${data.cabinType ? `<tr><td style="padding: 8px 0; color: #666; width: 140px;">Cabin Type</td><td style="padding: 8px 0; font-weight: bold;">${data.cabinType}</td></tr>` : ""}
          ${data.size ? `<tr><td style="padding: 8px 0; color: #666;">Size</td><td style="padding: 8px 0; font-weight: bold;">${data.size}</td></tr>` : ""}
          ${data.colour ? `<tr><td style="padding: 8px 0; color: #666;">Colour</td><td style="padding: 8px 0; font-weight: bold;">${data.colour}</td></tr>` : ""}
          ${data.notes ? `<tr><td style="padding: 8px 0; color: #666;">Notes</td><td style="padding: 8px 0;">${data.notes}</td></tr>` : ""}
        </table>
        <div style="margin-top: 16px; padding: 12px; background: #C26B4A; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: white; font-weight: bold;">📞 Call this customer within one working day</p>
        </div>
      </div>
    </div>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Tainhaus Website <onboarding@resend.dev>",
      to: ["info@tainhaus.co.uk"],
      subject: `New Quote Request from ${data.name} — ${data.cabinType ?? "Design Your Space"}`,
      html,
    }),
  });
}
