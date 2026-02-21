/**
 * lib/email.ts
 * Zoho Mail SMTP — works on DigitalOcean Droplet (no port restrictions).
 *
 * Env vars:
 *   ZOHO_SMTP_USER → registration.prithvi.iitkgp@zohomail.in
 *   ZOHO_SMTP_PASS → app password
 */

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.in',
  port: 587,
  secure: false, // Must be false for 587
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false // This prevents the "Handshake" error on Linux
  }
});

const FROM = `"Prithvi 2026" <${process.env.ZOHO_SMTP_USER}>`;

// ── OTP EMAIL ─────────────────────────────────────────────────────────────────

export async function sendOTPEmail(to: string, otp: string): Promise<void> {
  await transporter.sendMail({
    from: FROM,
    to,
    subject: 'Email Verification — Prithvi 2026',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#050a19;color:#fff;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#4fd1ff,#ffd700);padding:4px"></div>
        <div style="padding:40px">
          <h1 style="color:#4fd1ff;margin-bottom:8px;font-size:28px">Prithvi 2026</h1>
          <p style="color:#aaa;margin-bottom:32px">IIT Kharagpur · Earth Science Symposium</p>
          <h2 style="font-size:20px;margin-bottom:16px">Verify Your Email</h2>
          <p style="color:#ccc;margin-bottom:28px;line-height:1.6">
            Use the OTP below to verify your email address and complete registration.
          </p>
          <div style="background:rgba(79,209,255,0.1);border:2px solid rgba(79,209,255,0.4);border-radius:12px;padding:28px;text-align:center;margin-bottom:28px">
            <div style="font-size:44px;font-weight:900;letter-spacing:12px;color:#4fd1ff">${otp}</div>
            <div style="color:#aaa;font-size:13px;margin-top:10px">Valid for 10 minutes</div>
          </div>
          <p style="color:#777;font-size:13px">If you did not request this, please ignore this email.</p>
        </div>
        <div style="background:rgba(0,0,0,0.5);padding:18px;text-align:center;color:#555;font-size:12px">
          © Prithvi 2026 · Department of Geology &amp; Geophysics, IIT Kharagpur
        </div>
      </div>
    `,
  });
}

// ── REGISTRATION CONFIRMATION EMAIL ───────────────────────────────────────────

export async function sendRegistrationConfirmationEmail(
  to: string,
  name: string,
  registrationId: string,
  password: string
): Promise<void> {
  await transporter.sendMail({
    from: FROM,
    to,
    subject: `🎉 Registration Successful — ${registrationId} | Prithvi 2026`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#050a19;color:#fff;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#4fd1ff,#ffd700);padding:4px"></div>
        <div style="padding:40px">
          <h1 style="color:#4fd1ff;margin-bottom:8px;font-size:28px">Prithvi 2026</h1>
          <p style="color:#aaa;margin-bottom:32px">IIT Kharagpur · Earth Science Symposium</p>
          <h2 style="font-size:22px;margin-bottom:6px">Welcome, ${name}! 🎉</h2>
          <p style="color:#ccc;margin-bottom:28px;line-height:1.6">
            Your registration for <strong style="color:#4fd1ff">Prithvi 2026</strong> has been confirmed.
            We look forward to seeing you from <strong>3–5 April 2026</strong> at IIT Kharagpur!
          </p>
          <div style="background:rgba(79,209,255,0.08);border:1px solid rgba(79,209,255,0.25);border-radius:14px;padding:28px;margin-bottom:28px">
            <h3 style="color:#ffd700;margin-bottom:18px;font-size:16px;letter-spacing:1px">YOUR CREDENTIALS</h3>
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="color:#aaa;font-size:14px;padding:8px 0">Registration ID</td>
                <td style="color:#4fd1ff;font-weight:700;font-size:20px;letter-spacing:2px;padding:8px 0">${registrationId}</td>
              </tr>
              <tr>
                <td style="color:#aaa;font-size:14px;padding:8px 0;border-top:1px solid rgba(255,255,255,0.08)">Password</td>
                <td style="color:#fff;font-size:16px;font-family:monospace;padding:8px 0;border-top:1px solid rgba(255,255,255,0.08)">${password}</td>
              </tr>
            </table>
          </div>
          <div style="background:rgba(255,215,0,0.08);border:1px solid rgba(255,215,0,0.25);border-radius:12px;padding:18px;margin-bottom:28px">
            <p style="color:#ffd700;font-size:13px;margin:0">
              ⚠️ Please save your Registration ID and password. Use them to login at the Prithvi 2026 portal.
            </p>
          </div>
          <p style="color:#ccc;font-size:14px;line-height:1.6">
            🌍 <strong>3–5 April 2026</strong> · IIT Kharagpur, West Bengal, India<br>
            ✉️ registration.prithvi.iitkgp@zohomail.in
          </p>
        </div>
        <div style="background:rgba(0,0,0,0.5);padding:18px;text-align:center;color:#555;font-size:12px">
          © Prithvi 2026 · Department of Geology &amp; Geophysics, IIT Kharagpur
        </div>
      </div>
    `,
  });
}
