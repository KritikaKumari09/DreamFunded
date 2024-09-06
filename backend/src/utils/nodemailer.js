import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
});


// export async function sendEmail({to, type, code}) {
//   const info = await transporter.sendMail({
//     from: '"DreamFunded" <hkprojects9@gmail.com>',
//     to: to,
//     subject: type=='verify'?" Verify Your DreamFunded Account with OTP":"Reset Password Verification Code",
//     text: "Your verification code is: ",
//     html:  `<h3>Your verification code is: ${code} </h3>` ,
//   });

//   // console.log("Message sent: %s", info.messageId);
// }

// export async function sendEmail({to, type, code,userName}) {
//   const info = await transporter.sendMail({
//     from: '"DreamFunded" <hkprojects9@gmail.com>',
//     to: to,
//     subject: type === 'verify' ? "Verify Your DreamFunded Account with OTP" : "Reset Password Verification OTP",
//     // text: 
//     html: type === 'verify' ? 
//       `<p>Dear ${userName},</p>
//       <p>Thank you for choosing DreamFunded! To complete your account verification, please use the One-Time Password (OTP) provided below. This OTP is valid for the next 10 minutes. If you did not request this verification, please ignore this email.</p>
//       <h3>Your OTP: ${code}</h3>
//       <p>We are committed to ensuring the security of your account. If you have any questions or need further assistance, please do not hesitate to contact our support team.</p>
//       <p>Best regards,<br>The DreamFunded Team</p>` : 
//       `<h3>Your verification OTP is: ${code}</h3>`,
//   });
// }

export async function sendEmail({to, type, code, userName}) {
  const info = await transporter.sendMail({
    from: '"DreamFunded" <hkprojects9@gmail.com>',
    to: to,
    subject: type === 'verify' ? "Verify Your DreamFunded Account with OTP" : "Reset Password Verification Code",
    text: type === 'verify' ? 
      `Dear ${userName},

Thank you for choosing DreamFunded! To complete your account verification, please use the One-Time Password (OTP) provided below. This OTP is valid for the next 10 minutes. If you did not request this verification, please ignore this email.

Your OTP: ${code}

We are committed to ensuring the security of your account. If you have any questions or need further assistance, please do not hesitate to contact our support team.

Best regards,
The DreamFunded Team` : 
      `Dear User,

We received a request to reset your DreamFunded account password. Please use the One-Time Password (OTP) provided below to proceed with the password reset. This OTP is valid for the next 10 minutes. If you did not request this, please ignore this email.

Your OTP: ${code}

For any questions or further assistance, feel free to contact our support team.

Best regards,
The DreamFunded Team`,
    html: type === 'verify' ? 
      `<p>Dear ${userName},</p>
      <p>Thank you for choosing DreamFunded! To complete your account verification, please use the One-Time Password (OTP) provided below. This OTP is valid for the next 10 minutes. If you did not request this verification, please ignore this email.</p>
      <h3>Your OTP: ${code}</h3>
      <p>We are committed to ensuring the security of your account. If you have any questions or need further assistance, please do not hesitate to contact our support team.</p>
      <p>Best regards,<br>The DreamFunded Team</p>` : 
      `<p>Dear User,</p>
      <p>We received a request to reset your DreamFunded account password. Please use the One-Time Password (OTP) provided below to proceed with the password reset. This OTP is valid for the next 10 minutes. If you did not request this, please ignore this email.</p>
      <h3>Your OTP: ${code}</h3>
      <p>For any questions or further assistance, feel free to contact our support team.</p>
      <p>Best regards,<br>The DreamFunded Team</p>`,
  });
}


