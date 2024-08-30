import env from 'env/server'
import nodemailer from 'nodemailer'
import SMTPConnection from 'nodemailer/lib/smtp-connection'

const config = {
    host: env.MAILER_HOST,
    port: env.MAILER_PORT,
    secure: env.MAILER_SECURE,
    auth: {
        user: env.MAILER_USER,
        pass: env.MAILER_PASSWORD
    }
} as const satisfies SMTPConnection.Options

type MailerOptions = {
    to: string
    subject: string
    html: string
}

/**
 * Sends an email with the provided options
 */
export const mailer = async (options: MailerOptions) => {
    const transporter = nodemailer.createTransport(config)
    const mailOptions = {
        from: `"Cubus" <${config.auth.user}>`,
        ...options
    }
    return transporter.sendMail(mailOptions)
}
