const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.BREVO_EMAIL,
                pass: process.env.BREVO_SMTP_KEY,
            },
        });

        const info = await transporter.sendMail({
            from: process.env.BREVO_EMAIL,
            to: email,
            subject: title,
            html: body,
        });

        console.log("MAIL SENT:", info.messageId);
        return info;

    } catch (error) {
        console.error("MAIL ERROR:", error);
        throw error;
    }
};

module.exports = mailSender;