const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const testAccount = await nodemailer.createTestAccount({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "austyn.dickinson68@ethereal.email",
      pass: "Vhykr33QYMeak24frE",
    },
  });

  const info = await testAccount.sendEmail({
    from: "qwer0807 <qwer0807@test.com>",
    to: "bar@example.com",
    subject: "Test",
    html: "<h2>Test Email</h2>",
  });

  res.json(info);
};

module.exports = sendEmail;
