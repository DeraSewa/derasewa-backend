import nodemailer from "nodemailer";
import "dotenv/config";

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const sendMail = async ({ type, payload }) => {
    let _subject;
    let _html;

    if (type === 1) {
        _subject = "Account Register";
        _html = html_type_1({ payload });
    }

    let mailOptions = {
        from: `"DeraSewa" <${process.env.GMAIL_USER}>`,
        to: payload.email,
        subject: _subject,
        html: _html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}

function html_type_1({ payload }) {
    return `

<p>Dear ${payload.firstName} ${payload.lastName},</p>
<p>Your OTP is: ${payload.otp}</p>

    `;
}

export { sendMail };