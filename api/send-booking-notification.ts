import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const {
      fullName,
      email,
      phone,
      deviceModel,
      issueType,
      description,
      preferredDate,
      preferredTime,
    } = req.body;

    if (!fullName || !phone || !deviceModel || !issueType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff; color: #1e293b;">
        <div style="background: linear-gradient(135deg, #4f46e5, #3b82f6); padding: 20px; border-radius: 6px 6px 0 0; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px; font-weight: bold; tracking-wide: 0.05em;">New Repair Booking Request</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">iFixCellulaire Website</p>
        </div>
        
        <div style="padding: 20px;">
          <h2 style="font-size: 18px; color: #4f46e5; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-top: 0;">Client Details</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 120px;">Full Name:</td>
              <td style="padding: 6px 0; color: #334155;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 6px 0; color: #334155;">
                <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Email:</td>
              <td style="padding: 6px 0; color: #334155;">
                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email || "—"}</a>
              </td>
            </tr>
          </table>

          <h2 style="font-size: 18px; color: #4f46e5; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-top: 0;">Device & Issue</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 120px;">Device Model:</td>
              <td style="padding: 6px 0; color: #334155;">${deviceModel}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Issue:</td>
              <td style="padding: 6px 0; color: #334155;">
                <span style="background-color: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${issueType}</span>
              </td>
            </tr>
            ${description ? `
            <tr>
              <td style="padding: 6px 0; font-weight: bold; vertical-align: top;">Description:</td>
              <td style="padding: 6px 0; color: #475569; font-style: italic; white-space: pre-wrap;">${description}</td>
            </tr>
            ` : ""}
          </table>

          <h2 style="font-size: 18px; color: #4f46e5; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; margin-top: 0;">Preferred Schedule</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 120px;">Date:</td>
              <td style="padding: 6px 0; color: #334155; font-weight: bold;">${preferredDate || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Time:</td>
              <td style="padding: 6px 0; color: #334155; font-weight: bold;">${preferredTime || "—"}</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 0 0 6px 6px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
          This is an automated notification from the iFixCellulaire website booking form.
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: "iFixCellulaire Booking <onboarding@resend.dev>",
      to: ["ifixcellulaire@gmail.com"],
      subject: `New Booking: ${fullName} - ${deviceModel} (${issueType})`,
      html: emailHtml,
    });

    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: error.message });
  }
}
