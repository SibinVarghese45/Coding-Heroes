const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
});

            // console.log("VERIFY START");
            // await transporter.verify();
        // console.log("SMTP READY");

            let info = await transporter.sendMail({
                from: process.env.MAIL_USER,
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
            // console.log(info);
            return info;
    }
    catch(error) {
        console.log("FULL ERROR:", error);
    }
}


module.exports = mailSender;