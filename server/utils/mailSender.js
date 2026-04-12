const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

// 🔐 OTP Template only
const otpTemplate = (otp) => `
  <div style="font-family:Arial,sans-serif; background:#f4f4f4; padding:20px;">
    <div style="max-width:500px; margin:auto; background:#ffffff; padding:20px; border-radius:10px; text-align:center;">
      
      <h2 style="color:#333;">🔐 OTP Verification</h2>
      
      <p style="color:#555;">Your OTP code is:</p>
      
      <div style="font-size:32px; font-weight:bold; letter-spacing:6px; margin:20px 0; color:#000;">
        ${otp}
      </div>

      <p style="color:#888;">This OTP is valid for 5 minutes.</p>

      <hr style="margin:20px 0;" />

      <p style="font-size:12px; color:#aaa;">
        If you didn’t request this, you can ignore this email.
      </p>
    </div>
  </div>
`;


// 🚀 Mail sender (OTP only)
const mailSender = async (email, otp) => {
    try {
        const response = await resend.emails.send({
            from: "Coding Heroes <onboarding@resend.dev>",
            to: email,
            subject: "OTP Verification",
            html: otpTemplate(otp),
        });

        console.log(response);
        return response;

    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports = mailSender;
