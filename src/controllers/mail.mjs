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

    switch (type) {
        case 1:
            _subject = "Register Account";
            _html = html_type_1({ payload });
            break;
        case 2:
            _subject = "Account Register";
            _html = html_type_2({ payload });
            break;
        case 3:
            _subject = "Login Alert";
            _html = html_type_3({ payload });
            break;
        case 4:
            _subject = "Forgot Password";
            _html = html_type_4({ payload });
            break;
        case 4:
            _subject = "Password Modify";
            _html = html_type_5({ payload });
            break;
        default:
            break;
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
<p>Your OTP is: ${payload.otp} use this otp to register account</p>

    `;
}

function html_type_2({ payload }) {
    return `

<p>Dear ${payload.firstName} ${payload.lastName},</p>
<p>You successfully registered account on derasewa</p>

    `;
}

function html_type_3({ payload }) {
    return `

<p>Dear ${payload.firstName} ${payload.lastName},</p>
<p>Someone login you account, if it was you just ignore this message, if it was not you change the account password</p>

    `;
}

function html_type_4({ payload }) {
    return `

<p>Dear ${payload.firstName} ${payload.lastName},</p>
<p>use ${payload.otp} to change your password</p>

    `;
}

function html_type_5({ payload }) {
    return `

<p>Dear ${payload.firstName} ${payload.lastName},</p>
<p>Someone modified you account password, if it was you just ignore this, but if it was not you please secure your account</p>

    `;
}

export { sendMail };