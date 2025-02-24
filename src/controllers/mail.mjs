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
            _subject = "Account Registerd";
            _html = html_type_2({ payload });
            break;
        case 3:
            _subject = "Login Dectected";
            _html = html_type_3({ payload });
            break;
        case 4:
            _subject = "Change Password";
            _html = html_type_4({ payload });
            break;
        case 5:
            _subject = "Password Modified";
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

<p>Dear <strong>${payload.fullName}</strong>,</p>
<br/>
<p>Your OTP for account registration is: <strong>${payload.otp}</strong></p>
<p>This OTP is valid for 3 minutes. Do not share it with anyone.</p>
<p>If you did not request this, please secure you email account ASAP.</p>
<br/>
<p>Thank you for choosing DeraSewa.</p>
<br/>
<p>Regards,</p>
<strong>DeraSewa</strong>

    `;
}

function html_type_2({ payload }) {
    return `

<p>Dear <strong>${payload.fullName}</strong>,</p>
<br/>
<p>You have successfully created your account on DeraSewa.</p>
<p>If you did not request this, please secure you email account ASAP.</p>
<br/>
<p>Thank you for choosing DeraSewa.</p>
<br/>
<p>Regards,</p>
<strong>DeraSewa</strong>

    `;
}

function html_type_3({ payload }) {
    return `

<p>Dear <strong>${payload.fullName}</strong>,</p>
<br/>
<p>We noticed a new login to your account on DeraSewa.</p>
<p>If this was you, you can ignore this email.</p>
<p>If you did not request this, please secure you email account ASAP.</p>
<br/>
<p>Thank you for choosing DeraSewa.</p>
<br/>
<p>Regards,</p>
<strong>DeraSewa</strong>

    `;
}

function html_type_4({ payload }) {
    return `

<p>Dear <strong>${payload.fullName}</strong>,</p>
<br/>
<p>Your OTP for changing password is: <strong>${payload.otp}</strong></p>
<p>This OTP is valid for 3 minutes. Do not share it with anyone.</p>
<p>If you did not request this, please secure you email account ASAP.</p>
<br/>
<p>Thank you for choosing DeraSewa.</p>
<br/>
<p>Regards,</p>
<strong>DeraSewa</strong>

    `;
}

function html_type_5({ payload }) {
    return `

<p>Dear <strong>${payload.fullName}</strong>,</p>
<br/>
<p>We noticed you have successfully changed your DeraSewa app password.</strong></p>
<p>If this was you, you can ignore this email.</p>
<p>If you did not request this, please secure you email account ASAP.</p>
<br/>
<p>Thank you for choosing DeraSewa.</p>
<br/>
<p>Regards,</p>
<strong>DeraSewa</strong>

    `;
}

export { sendMail };