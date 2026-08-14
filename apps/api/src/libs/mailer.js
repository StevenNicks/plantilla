import nodemailer from 'nodemailer'
import chalk from 'chalk'

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env

const transporter = SMTP_HOST
   ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
   })
   : null

export async function sendMail({ to, subject, text, html }) {
   if (!transporter) {
      console.log(chalk.yellow('\n[mailer] SMTP no configurado (SMTP_HOST). Mostrando el correo en consola en su lugar:'))
      console.log(chalk.yellow(`  Para: ${to}`))
      console.log(chalk.yellow(`  Asunto: ${subject}`))
      console.log(chalk.yellow(`  ${text ?? html}\n`))
      return
   }

   await transporter.sendMail({ from: MAIL_FROM || SMTP_USER, to, subject, text, html })
}
