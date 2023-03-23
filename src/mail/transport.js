import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0c578df8ae2841",
    pass: "cf50492319d195"
  }
})